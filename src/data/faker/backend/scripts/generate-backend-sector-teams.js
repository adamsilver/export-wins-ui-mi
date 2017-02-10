const path = require( 'path' );

const sectorTeamsJson = require( './sector-teams-json' );
const writeFiles = require( '../../helpers/write-files' );

let files = [];
let outputPath = path.resolve( __dirname, '../output/sector_teams/' );

let jsonFiles = {
	index: sectorTeamsJson.createIndex(),
	overview: sectorTeamsJson.createOverview()
};

for( let file in jsonFiles ){

	const json = JSON.stringify( jsonFiles[ file ], null, 3 );
	const fileName = ( outputPath + '/' + file + '.json' );

	files.push( [ fileName, json ] );
}

writeFiles( files );
