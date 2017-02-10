const path = require( 'path' );

const osRegionsJson = require( './os-regions-json' );
const writeFiles = require( '../../helpers/write-files' );

let files = [];
let outputPath = path.resolve( __dirname, '../output/os_regions/' );

let jsonFiles = {
	overview: osRegionsJson.createOverview()
};

for( let file in jsonFiles ){

	const json = JSON.stringify( jsonFiles[ file ], null, 3 );
	const fileName = ( outputPath + '/' + file + '.json' );

	files.push( [ fileName, json ] );
}

writeFiles( files );
