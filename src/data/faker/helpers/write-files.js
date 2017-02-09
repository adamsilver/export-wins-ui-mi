const fs = require( 'fs' );
const path = require( 'path' );


function mkdirp( filePath ){

  const dirname = path.dirname( filePath );

  if( fs.existsSync( dirname ) ){

    return true;
  }

  mkdirp( dirname );
  fs.mkdirSync( dirname );
}

module.exports = function( files ){

	let filesToWrite = 0;
	let filesWritten = 0;

	function fileWritten(){

		filesWritten++;

		if( filesWritten === filesToWrite ){

			console.log( '%s file%s written', filesWritten, ( filesWritten === 1 ? '' : 's' ) );
		}
	}

	for( let [ file, json ] of files ){

		filesToWrite++;

		mkdirp( file );

		fs.writeFile( file, json, ( err ) => {

			if( err ){

				console.log( err );
			}

			fileWritten();
		} );
	}
};
