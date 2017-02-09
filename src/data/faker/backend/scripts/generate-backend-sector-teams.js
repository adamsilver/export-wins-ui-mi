const jsf = require( 'json-schema-faker' );
const path = require( 'path' );

const writeFiles = require( '../../helpers/write-files' );
const calculateTotal = require( './lib/calculate-total' );
const calculateConfirmedPercentages = require( './lib/calculate-confirmed-percentages' );

const listSchema = require( '../../../schema/backend/sector_teams/index.schema' );
const overviewSchema = require( '../../../schema/backend/sector_teams/overview.schema' );

let files = [];
let outputPath = path.resolve( __dirname, '../output/sector_teams/' );

let sectorTeamJson = {
	index: jsf( listSchema ),
	overview: jsf( overviewSchema )
};


for( let sector of sectorTeamJson.overview ){

	calculateTotal( sector.hvc_target_values );
	calculateConfirmedPercentages( sector.confirmed_percent );

	for( let hvcGroup of sector.hvc_groups ){

		calculateTotal( hvcGroup.hvc_target_values );
		calculateConfirmedPercentages( hvcGroup.confirmed_percent );
	}
}

for( let file in sectorTeamJson ){

	const json = JSON.stringify( sectorTeamJson[ file ], null, 3 );
	const fileName = ( outputPath + '/' + file + '.json' );

	files.push( [ fileName, json ] );
}

writeFiles( files );
