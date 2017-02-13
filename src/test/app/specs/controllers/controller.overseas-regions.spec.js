const proxyquire = require( 'proxyquire' );
const backendService = require( '../../../../app/lib/service/service.backend' );

let controller;

describe( 'Overseas Regions controller', function(){

	beforeEach( function(){

		const stubs = {
			'../lib/service/service.backend': backendService
		};

		controller = proxyquire( '../../../../app/controllers/controller.overseas-regions', stubs );
	} );

	describe( 'Overview', function(){
	
		it( 'Should get the overview data and render the correct view', function( done ){

			const req = {
				alice: '123'
			};

			spyOn( backendService, 'getOverseasRegionsOverview' ).and.callThrough();

			controller.overview( req, { render: function( view, data ){

				expect( backendService.getOverseasRegionsOverview ).toHaveBeenCalledWith( req.alice );
				expect( data.regionGroups ).toBeDefined();
				expect( view ).toEqual( 'overseas-regions/overview.html' );
				done();
			} } );
		} );
	} );

	describe( 'List', function(){
	
		it( 'Should get the list data and render the correct view', function( done ){
		
			spyOn( backendService, 'getOverseasRegions' ).and.callThrough();

			const req = {
				alice: '87654'
			};

			controller.list( req, { render: function( view, data ){

				expect( backendService.getOverseasRegions ).toHaveBeenCalledWith( req.alice );
				expect( view ).toEqual( 'overseas-regions/list.html' );
				expect( data.regions ).toBeDefined();
				done();
			} } );
		} );
	} );

	describe( 'Region', function(){
	
		it( 'Should get the region data and render the correct view', function( done ){
	
			spyOn( backendService, 'getOverseasRegionInfo' ).and.callThrough();

			const req = {
				alice: '1234',
				params: {
					id: 1234
				}
			};

			controller.region( req, { render: function( view, data ){

				expect( backendService.getOverseasRegionInfo ).toHaveBeenCalledWith( req.alice, req.params.id );
				expect( view ).toEqual( 'overseas-regions/detail.html' );
				expect( data ).toBeDefined();
				done();
			} } );
		} );
	} );
} );
