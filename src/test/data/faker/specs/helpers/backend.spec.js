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
						non_confirmed: 100,
						total: 1000
					},
					value: {
						confirmed: 200,
						non_confirmed: 200,
						total: 1000
					}
				},

				test2: {
					number: {
						confirmed: 250,
						non_confirmed: 250,
						total: 1000
					},
					value: {
						confirmed: 1000,
						non_confirmed: 1000,
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
				target_performance: 25,
				target: 300
			};

			let values2 = {
				current: 100,
				target_performance: 50,
				target: 1000
			} ;

			helpers.calculateTotal( values );
			helpers.calculateTotal( values2 );
	
			expect( values.target ).toEqual( 100 );
			expect( values2.target ).toEqual( 200 );
		} );
	} );
} );
