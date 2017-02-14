const proxyquire = require( 'proxyquire' );
const backendService = require( '../../../../app/lib/service/service.backend' );
const errorHandler = require( '../../../../app/lib/render-error' );

let controller;

describe( 'Overseas Regions controller', function(){

	beforeEach( function(){

		const stubs = {
			'../lib/service/service.backend': backendService
		};

		controller = proxyquire( '../../../../app/controllers/controller.sector-teams', stubs );
	} );

	describe( 'Overview', function(){
	
		it( 'Should get the overview data and render the correct view', function( done ){

			const req = {
				alice: '123'
			};

			spyOn( backendService, 'getSectorTeamsOverview' ).and.callThrough();
			spyOn( errorHandler, 'handler' ).and.callThrough();

			controller.overview( req, { render: function( view, data ){

				expect( backendService.getSectorTeamsOverview ).toHaveBeenCalledWith( req.alice );
				expect( data.sectorTeams ).toBeDefined();
				expect( view ).toEqual( 'sector-teams/overview' );
				expect( errorHandler.handler ).toHaveBeenCalled();
				done();
			} } );
		} );
	} );

	describe( 'List', function(){
	
		it( 'Should get the list data and render the correct view', function( done ){
		
			spyOn( backendService, 'getSectorTeams' ).and.callThrough();
			spyOn( errorHandler, 'handler' ).and.callThrough();

			const req = {
				alice: '87654'
			};

			controller.list( req, { render: function( view, data ){

				expect( backendService.getSectorTeams ).toHaveBeenCalledWith( req.alice );
				expect( view ).toEqual( 'sector-teams/list.html' );
				expect( data.sectorTeams ).toBeDefined();
				expect( errorHandler.handler ).toHaveBeenCalled();
				done();
			} } );
		} );
	} );

	describe( 'Team', function(){
	
		it( 'Should get the team data and render the correct view', function( done ){
	
			spyOn( backendService, 'getSectorTeamInfo' ).and.callThrough();
			spyOn( errorHandler, 'handler' ).and.callThrough();

			const req = {
				alice: '1234',
				params: {
					id: 1234
				}
			};

			controller.team( req, { render: function( view, data ){

				expect( backendService.getSectorTeamInfo ).toHaveBeenCalledWith( req.alice, req.params.id );
				expect( view ).toEqual( 'sector-teams/detail.html' );
				expect( data.sectorName ).toBeDefined();
				expect( data.winSummary ).toBeDefined();
				expect( data.hvcTargetPerformance ).toBeDefined();
				expect( data.sectorPerformance ).toBeDefined();
				expect( data.topNonHvc ).toBeDefined();
				expect( data.topNonHvcScale ).toBeDefined();
				expect( errorHandler.handler ).toHaveBeenCalled();
				done();
			} } );
		} );
	} );
} );
