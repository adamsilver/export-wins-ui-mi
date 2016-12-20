
const targetColour = 'rgb(0, 0, 0)';
const hvcColour = 'rgb(6, 199, 252)';
const nonHvcColour = 'rgb(154, 166, 14)';
const nonExportColour = 'rgb(255, 140, 130)';

function createTrace( name, x, y, color, dashed, mode ){

	let trace = {
		name,
		x,
		y,
		mode: ( mode || 'lines+markers' ),
		marker: {
			color,
			size: 4
		},
		line: {
			color,
			width: 2
		}
	};

	if( dashed ){

		trace.line.dash = 'dashdot';
	}

	return trace;
}

module.exports = {

	create: function( data ){

		let x = [];

		let target = [];

		let hvcConfirmed = [];
		let nonHvcConfirmed = [];
		let nonExportConfirmed = [];

		let hvcUnconfirmed = [];
		let nonHvcUnconfirmed = [];
		let nonExportUnconfirmed = [];

		for( let month of data.months ){

			x.push( month.date );

			target.push( data.target );

			hvcConfirmed.push( month.totals.hvc.confirmed );
			nonHvcConfirmed.push( month.totals.nonHvc.confirmed );
			nonExportConfirmed.push( month.totals.nonExport.confirmed );

			hvcUnconfirmed.push( month.totals.hvc.unconfirmed );
			nonHvcUnconfirmed.push( month.totals.nonHvc.unconfirmed );
			nonExportUnconfirmed.push( month.totals.nonExport.unconfirmed );
		}

		const targetTrace = createTrace( data.targetName + ' target', x, target, targetColour, false, 'lines' );

		const hvcConfirmedTrace = createTrace( 'hvc confirmed', x, hvcConfirmed, hvcColour );
		const nonHvcConfirmedTrace = createTrace( 'non-HVC confirmed', x, nonHvcConfirmed, nonHvcColour );
		const nonExportConfirmedTrace = createTrace( 'non-export confirmed', x, nonExportConfirmed, nonExportColour );

		const hvcUnconfirmedTrace = createTrace( 'hvc unconfirmed', x, hvcUnconfirmed, hvcColour, true );
		const nonHvcUnconfirmedTrace = createTrace( 'non-HVC unconfirmed', x, nonHvcUnconfirmed, nonHvcColour, true );
		const nonExportUnconfirmedTrace = createTrace( 'non-export unconfirmed', x, nonExportUnconfirmed, nonExportColour, true );

		return {

			//max: data.max,
			//min: data.min,
			data: [

				targetTrace,

				hvcConfirmedTrace,
				hvcUnconfirmedTrace,
				
				nonHvcConfirmedTrace,
				nonHvcUnconfirmedTrace,

				nonExportConfirmedTrace,
				nonExportUnconfirmedTrace
			]
		};
	}
};
