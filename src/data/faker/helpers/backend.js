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

module.exports = {

	writeFiles: function( files ){

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
	},

	createMonthDate: function( month ){

		let date = new Date( month.date );
		month.date = ( date.getFullYear() + '-' + ( date.getMonth() + 1 ) );
	},

	calculateValues: function( data, keys ){

		for( let key of keys ){

			let info = data[ key ];

			let num = info.number;
			let val = info.value;

			num.total = ( num.unconfirmed + num.confirmed );
			val.total = ( val.unconfirmed + val.confirmed );
		}
	},

	calculatePercentages: function( data, keys ){

		for( let key of keys ){

			let info = data[ key ];

			info.unconfirmed_percent = ( 100 - info.confirmed_percent );
		}
	},

	calculateTotal: function( values ){

		const total = ( ( values.current / values.target_percentage ) * 100 );

		values.target = Math.round( total );
	},

	calculateConfirmedPercentages: function( percentages ){

		percentages.non_hvc = ( 100 - percentages.hvc );
	},

	calculateExportTotals: function( exportVal ){

		exportVal.totals.number.confirmed = ( exportVal.hvc.number.confirmed + exportVal.non_hvc.number.confirmed );
		exportVal.totals.number.unconfirmed = ( exportVal.hvc.number.unconfirmed + exportVal.non_hvc.number.unconfirmed );
		exportVal.totals.number.grand_total = ( exportVal.hvc.number.total + exportVal.non_hvc.number.total );

		exportVal.totals.value.confirmed = ( exportVal.hvc.value.confirmed + exportVal.non_hvc.value.confirmed );
		exportVal.totals.value.unconfirmed = ( exportVal.hvc.value.unconfirmed + exportVal.non_hvc.value.unconfirmed );
		exportVal.totals.value.grand_total = ( exportVal.hvc.value.total + exportVal.non_hvc.value.total );
	}
};
