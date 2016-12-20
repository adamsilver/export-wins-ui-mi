
const cluster = require( 'cluster' );
const logger = require( 'winston' );
const config = require( './config' );

const numberOfWorkers = config.server.workers;
const isClustered = ( numberOfWorkers > 1 );

function listenForWorkerMessages( worker ){

	worker.on( 'message', function( msg ){

		logger.debug( 'Master sending message to workers' );

		Object.keys( cluster.workers ).forEach( function( workerId ){
			cluster.workers[ workerId ].send( msg );
		} );
	} );
}

function startApp(){

	const express = require( 'express' );
	const routes = require( './routes' );
	const nunjucks = require( 'nunjucks' );
	const serveStatic = require( 'serve-static' );
	const cookieParser = require( 'cookie-parser' );
	const path = require( 'path' );
	const morganLogger = require( 'morgan' );
	const nunjucksFilters = require( './lib/nunjucks-filters' );
	const alice = require( './lib/middleware/alice' );
	const uuid = require( './lib/middleware/uuid' );

	const app = express();
	const serverConfig = config.server;
	const pathToPublic = path.resolve( __dirname, '../public' );
	const env = app.get( 'env' );
	const isDev = ( 'development' === env );
	let nunjucksEnv;

	app.set( 'view engine', 'html' );
	app.set( 'view cache', config.views.cache );

	nunjucksEnv = nunjucks.configure( ( __dirname + '/views' ), {
		autoescape: true,
		watch: config.isDev,
		noCache: !config.views.cache,
		express: app
	} );

	nunjucksFilters( nunjucksEnv );

	app.use( '/public', serveStatic( pathToPublic ) );
	app.use( morganLogger( ( isDev ? 'dev' : 'combined' ) ) );
	app.use( cookieParser() );
	app.use( uuid );
	app.use( alice );

	routes( express, app );

	app.listen( serverConfig.port, function(){

		if( isClustered ){

			logger.info( 'Worker ' + cluster.worker.id + ' created: App running in %s mode, listening at http://%s:%s', env, serverConfig.host, serverConfig.port );

		} else {

			logger.info( '\nApp running in %s mode\nListening at http://%s:%s', env, serverConfig.host, serverConfig.port );
		}
	});

	if( isClustered ){

		cluster.worker.on( 'message', function( msg ){

			logger.debug( 'Worker ' + cluster.worker.id + ' received message' + msg );
		} );

		if( isDev ){
			app.use( function( req, res, next ){

				logger.debug( 'Worker: %s, handling request: %s', cluster.worker.id, req.url );
				next();
			} );
		}
	}
}

if( isClustered ){

	//if this is the master then create the workers
	if( cluster.isMaster ){

		for( var i = 0; i < numberOfWorkers; i++ ) {

			listenForWorkerMessages( cluster.fork() );
		}

	//if we are a worker then create an HTTP server
	} else {

		startApp();
	}

} else {

	startApp();
}
