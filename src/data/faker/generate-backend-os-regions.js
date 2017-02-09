const jsf = require( 'json-schema-faker' );
const helpers = require( './helpers/backend' );
const path = require( 'path' );

const overviewSchema = require( '../schema/backend/os_regions/overview.schema' );

let files = [];
let outputPath = path.resolve( __dirname, 'backend/os_regions/' );

let osRegionsJson = {
	overview: jsf( overviewSchema )
};

for( let region of osRegionsJson.overview ){

	helpers.calculateConfirmedPercentages( region.confirmed_percent );
	helpers.calculateTotal( region.hvc_target_values );
}

for( let file in osRegionsJson ){

	const json = JSON.stringify( osRegionsJson[ file ], null, 3 );
	const fileName = ( outputPath + '/' + file + '.json' );

	files.push( [ fileName, json ] );
}

helpers.writeFiles( files );
