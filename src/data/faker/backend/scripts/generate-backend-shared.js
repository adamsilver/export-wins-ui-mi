const path = require( 'path' );

const sharedJson = require( './shared-json' );
const writeFiles = require( '../../helpers/write-files' );

let files = [];
let outputPath = path.resolve( __dirname, '../output/shared/' );

let jsonFiles = {
	index: sharedJson.createIndex(),
	sector: sharedJson.createSector(),
	campaigns: sharedJson.createCampaigns(),
	months: sharedJson.createMonths(),
	top_non_hvcs: sharedJson.createTopNonHvcs()
};


for( let file in jsonFiles ){

	const json = JSON.stringify( jsonFiles[ file ], null, 3 );
	const fileName = ( outputPath + '/' + file + '.json' );

	files.push( [ fileName, json ] );
}

writeFiles( files );
