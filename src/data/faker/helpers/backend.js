module.exports = {

	createMonthDate: function( month ){

		let date = new Date( month.date );
		month.date = ( date.getFullYear() + '-' + ( date.getMonth() + 1 ) );
	},

	calculateValues: function( data, keys ){

		for( let key of keys ){

			let info = data[ key ];

			let num = info.number;
			let val = info.value;

			num.total = ( num.non_confirmed + num.confirmed );
			val.total = ( val.non_confirmed + val.confirmed );
		}
	},

	calculatePercentages: function( data, keys ){

		for( let key of keys ){

			let info = data[ key ];

			info.unconfirmed_percent = ( 100 - info.confirmed_percent );
		}
	},

	calculateTotal: function( values ){

		const total = ( ( values.current / values.target_performance ) * 100 );

		values.target = total;
	}
};
