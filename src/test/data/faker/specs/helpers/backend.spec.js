const helpers = require( '../../../../../data/faker/helpers/backend' );

describe( 'Backend helpers', function(){

	describe( 'createMonthDate', function(){
	
		it( 'Should create the year and month from a date', function(){
	
			let date = new Date();
			let month = {
				date: date.toGMTString()
			};
			let month2 = {
				date: 'Wed May 25 2016 12:35:08 GMT+0100 (BST)'
			};

			helpers.createMonthDate( month );
			helpers.createMonthDate( month2 );

			expect( month.date ).toEqual( date.getFullYear() + '-' + ( date.getMonth() + 1 ) );
			expect( month2.date ).toEqual( '2016-5' );
		} );
	} );

	describe( 'calculateValues', function(){
	
		it( 'Should calculate the total values', function(){
		
			let input = {

				test1: {
					number: {
						confirmed: 100,
						unconfirmed: 100,
						total: 1000
					},
					value: {
						confirmed: 200,
						unconfirmed: 200,
						total: 1000
					}
				},

				test2: {
					number: {
						confirmed: 250,
						unconfirmed: 250,
						total: 1000
					},
					value: {
						confirmed: 1000,
						unconfirmed: 1000,
						total: 1000
					}
				}
			};

			helpers.calculateValues( input, [ 'test1', 'test2' ] );

			expect( input.test1.number.total ).toEqual( 200 );
			expect( input.test1.value.total ).toEqual( 400 );

			expect( input.test2.number.total ).toEqual( 500 );
			expect( input.test2.value.total ).toEqual( 2000 );
		} );
	} );

	describe( 'calculatePercentages', function(){
	
		it( 'Should calculate the unconfirmed percentage', function(){
	
			let input = {
				test1: {
					confirmed_percent: 50,
					unconfirmed_percent: 100
				},
				test2: {
					confirmed_percent: 99,
					unconfirmed_percent: 99
				}
			};

			helpers.calculatePercentages( input, [ 'test1', 'test2' ] );

			expect( input.test1.unconfirmed_percent ).toEqual( 50 );
			expect( input.test2.unconfirmed_percent ).toEqual( 1 );
		} );
	} );

	describe( 'calculateTotal', function(){
	
		it( 'Should calculate the total from an amount and percentage of the total', function(){

			let values = {
				current: 25,
				target_percentage: 25,
				target: 300
			};

			let values2 = {
				current: 100,
				target_percentage: 50,
				target: 1000
			};

			let values3 = {
				current: 62132,
				target_percentage: 52,
				target: 1
			};

			helpers.calculateTotal( values );
			helpers.calculateTotal( values2 );
			helpers.calculateTotal( values3 );
	
			expect( values.target ).toEqual( 100 );
			expect( values2.target ).toEqual( 200 );
			expect( values3.target ).toEqual( 119485 );
		} );
	} );

	describe( 'calculateConfirmedPercentages', function(){
	
		it( 'Should calculate the non_hvc percentage', function(){
	
			let percentages = {
				hvc: 50,
				non_hvc: 70
			};

			helpers.calculateConfirmedPercentages( percentages );

			expect( percentages.non_hvc ).toEqual( 50 );
		} );
	} );

	describe( 'calculateExportTotals', function(){
	
		it( 'Should calculat the confirmed, unconfirmed and grand_total', function(){
	
			let exportVal = {
				hvc: {
					number: {
						confirmed: 50,
						unconfirmed: 100,
						total: 150
					},
					value: {
						confirmed: 150,
						unconfirmed: 200,
						total: 350
					}
				},
				non_hvc: {
					number: {
						confirmed: 250,
						unconfirmed: 300,
						total: 550
					},
					value: {
						confirmed: 350,
						unconfirmed: 400,
						total: 750
					}
				},
				totals: {
					number: {
						confirmed: 0,
						unconfirmed: 0,
						grand_total: 0
					},
					value: {
						confirmed: 0,
						unconfirmed: 0,
						grand_total: 0
					}
				}
			};

			helpers.calculateExportTotals( exportVal );

			expect( exportVal.totals.number.confirmed ).toEqual( 300 );
			expect( exportVal.totals.number.unconfirmed ).toEqual( 400 );
			expect( exportVal.totals.number.grand_total ).toEqual( 700 );

			expect( exportVal.totals.value.confirmed ).toEqual( 500 );
			expect( exportVal.totals.value.unconfirmed ).toEqual( 600 );
			expect( exportVal.totals.value.grand_total ).toEqual( 1100 );
		} );
	} );
} );
