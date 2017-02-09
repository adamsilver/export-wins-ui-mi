const jsf = require( 'json-schema-faker' );
const helpers = require( './helpers/backend' );
const path = require( 'path' );

const listSchema = require( '../schema/backend/sector_teams/index.schema' );
const overviewSchema = require( '../schema/backend/sector_teams/overview.schema' );

let files = [];
let outputPath = path.resolve( __dirname, 'backend/sector_teams/' );

let sectorTeamJson = {
	index: jsf( listSchema ),
	overview: jsf( overviewSchema )
};


for( let sector of sectorTeamJson.overview ){

	helpers.calculateTotal( sector.hvc_target_values );
	helpers.calculateConfirmedPercentages( sector.confirmed_percent );

	for( let hvcGroup of sector.hvc_groups ){

		helpers.calculateTotal( hvcGroup.hvc_target_values );
		helpers.calculateConfirmedPercentages( hvcGroup.confirmed_percent );
	}
}

for( let file in sectorTeamJson ){

	const json = JSON.stringify( sectorTeamJson[ file ], null, 3 );
	const fileName = ( outputPath + '/' + file + '.json' );

	files.push( [ fileName, json ] );
}

helpers.writeFiles( files );
