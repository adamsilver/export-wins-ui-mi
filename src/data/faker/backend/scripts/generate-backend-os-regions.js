const jsf = require( 'json-schema-faker' );
const path = require( 'path' );

const writeFiles = require( '../../helpers/write-files' );
const calculateTotal = require( './lib/calculate-total' );
const calculateConfirmedPercentages = require( './lib/calculate-confirmed-percentages' );

const overviewSchema = require( '../../../schema/backend/os_regions/overview.schema' );

let files = [];
let outputPath = path.resolve( __dirname, '../output/os_regions/' );

let osRegionsJson = {
	overview: jsf( overviewSchema )
};

for( let region of osRegionsJson.overview ){

	calculateConfirmedPercentages( region.confirmed_percent );
	calculateTotal( region.hvc_target_values );
}

for( let file in osRegionsJson ){

	const json = JSON.stringify( osRegionsJson[ file ], null, 3 );
	const fileName = ( outputPath + '/' + file + '.json' );

	files.push( [ fileName, json ] );
}

writeFiles( files );
