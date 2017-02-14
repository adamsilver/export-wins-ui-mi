const proxyquire = require( 'proxyquire' );
const backendService = require( '../../../../app/lib/service/service.backend' );
const errorHandler = require( '../../../../app/lib/render-error' );

let controller;

describe( 'Overseas Regions controller', function(){

	beforeEach( function(){

		const stubs = {
			'../lib/service/service.backend': backendService,
			'../lib/render-error': errorHandler
		};

		controller = proxyquire( '../../../../app/controllers/controller.index', stubs );
	} );

	describe( 'Handler', function(){
	
		it( 'Should get the data and render the correct view', function( done ){
		
			spyOn( backendService, 'getSectorTeamsAndOverseasRegions' ).and.callThrough();
			spyOn( errorHandler, 'handler' ).and.callThrough();

			const req = {
				alice: '87654'
			};

			controller( req, { render: function( view, data ){

				expect( backendService.getSectorTeamsAndOverseasRegions ).toHaveBeenCalledWith( req.alice );
				expect( view ).toEqual( 'index.html' );
				expect( data.sectorTeams ).toBeDefined();
				expect( data.overseasRegions ).toBeDefined();
				expect( errorHandler.handler ).toHaveBeenCalled();
				done();
			} } );
		} );
	} );
} );
