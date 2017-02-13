const proxyquire = require( 'proxyquire' );
const getBackendStub = require( '../../../helpers/get-backend-stub' );

const configStub = { backend: { stub: false, fake: false, mock: false } };

let alice = 'test';
let stubs;
let backendService;
let monthsSpy;
let campaignsSpy;
let sectorSpy;
let sectorTeamsOverviewSpy;
let osRegionsOverviewSpy;
let hvcGroupSpy;
let backend;

function returnStub( file ){

	spyOn( backend, 'get' ).and.callFake( function( alice, path, cb ){

		cb( null, { isSuccess: true, elapsedTime: 0 }, getBackendStub( file ) );
	} );
}

describe( 'Backend service', function(){

	beforeEach( function(){

		monthsSpy = jasmine.createSpy( 'months' );
		campaignsSpy = jasmine.createSpy( 'campaigns' );
		sectorSpy = jasmine.createSpy( 'sector' );
		sectorTeamsOverviewSpy = jasmine.createSpy( 'sector-teams-overview' );
		osRegionsOverviewSpy = jasmine.createSpy( 'os-regions-overview' );
		hvcGroupSpy = jasmine.createSpy( 'hvc-group' );
		backend = {
			get: function(){}
		};

		stubs = {
			'../../config': configStub,
			'../logger': require( '../../../helpers/mock-logger' ),
			'../transformers/months': monthsSpy,
			'../transformers/campaigns': campaignsSpy,
			'../transformers/sector': sectorSpy,
			'../transformers/sector-teams-overview': sectorTeamsOverviewSpy,
			'../transformers/os-regions-overview': osRegionsOverviewSpy,
			'../transformers/hvc-group': hvcGroupSpy,
			'../backend': backend
		};

		backendService = proxyquire( '../../../../../app/lib/service/service.backend', stubs );
	} );

	describe( 'Getting the sector team', function(){
	
		it( 'Should use the sector transformer', function( done ){

			returnStub( '/sector_teams/' );
	
			backendService.getSectorTeam( alice, '3' ).then( () => {

				expect( sectorSpy ).toHaveBeenCalled();
				expect( sectorSpy.calls.count() ).toEqual( 1 );
				done();
			} );
		} );
	} );

	describe( 'Getting the sector team months', function(){
	
		it( 'Should use the months transformer', function( done ){

			returnStub( '/sector_teams/months' );
	
			backendService.getSectorTeamMonths( alice, '3' ).then( () => {

				expect( monthsSpy ).toHaveBeenCalled();
				expect( monthsSpy.calls.count() ).toEqual( 1 );
				done();
			} );
		} );
	} );

	describe( 'Getting the sector team campaigns', function(){
	
		it( 'Should use the campaigns transformer', function( done ){

			returnStub( '/sector_teams/campaigns' );
	
			backendService.getSectorTeamCampaigns( alice, '3' ).then( () => {

				expect( campaignsSpy ).toHaveBeenCalled();
				expect( campaignsSpy.calls.count() ).toEqual( 1 );
				done();
			} );
		} );
	} );
	
	describe( 'Getting the sector team overview', function(){
	
		it( 'Should use the sector teams overview transformer', function( done ){

			returnStub( '/sector_teams/overview' );
	
			backendService.getSectorTeamsOverview( alice, '3' ).then( () => {

				expect( sectorTeamsOverviewSpy ).toHaveBeenCalled();
				expect( sectorTeamsOverviewSpy.calls.count() ).toEqual( 1 );
				done();
			} );
		} );
	} );

	describe( 'Getting the overseas region', function(){
	
		it( 'Should use the sector transformer', function( done ){

			returnStub( '/os_regions/region' );
	
			backendService.getOverseasRegion( alice, '3' ).then( () => {

				expect( sectorSpy ).toHaveBeenCalled();
				expect( sectorSpy.calls.count() ).toEqual( 1 );
				done();
			} );
		} );
	} );

	describe( 'Getting the overseas regions months', function(){
	
		it( 'Should use the months transformer', function( done ){

			returnStub( '/os_regions/months' );
	
			backendService.getOverseasRegionMonths( alice, '3' ).then( () => {

				expect( monthsSpy ).toHaveBeenCalled();
				expect( monthsSpy.calls.count() ).toEqual( 1 );
				done();
			} );
		} );
	} );

	describe( 'Getting the overseas regions campaigns', function(){
	
		it( 'Should use the campaigns transformer', function( done ){

			returnStub( '/os_regions/campaigns' );
	
			backendService.getOverseasRegionCampaigns( alice, '3' ).then( () => {

				expect( campaignsSpy ).toHaveBeenCalled();
				expect( campaignsSpy.calls.count() ).toEqual( 1 );
				done();
			} );
		} );
	} );

	describe( 'Getting the overseas regions overview', function(){
	
		it( 'Should use the overseas regions overview transformer', function( done ){

			returnStub( '/os_regions/overview' );
	
			backendService.getOverseasRegionsOverview( alice, '3' ).then( () => {

				expect( osRegionsOverviewSpy ).toHaveBeenCalled();
				expect( osRegionsOverviewSpy.calls.count() ).toEqual( 1 );
				done();
			} );
		} );
	} );

	describe( 'Getting the region name', function(){
	
		it( 'Should return the correct name', function( done ){

			returnStub( '/os_regions/' );
		
			backendService.getOverseasRegionName( 'test', 99488 ).then( ( name ) => {

				expect( name ).toEqual( 'sunt nisi molestiae' );
				done();
				
			} ).catch( ( err ) => { expect( err ).not.toBeDefined(); done(); } );
		} );
	} );

	describe( 'Getting the list of HVC Groups', function(){
	
		it( 'Should return just the hvc groups', function( done ){

			returnStub( '/hvc_groups/' );
	
			backendService.getHvcGroups().then( ( hvcGroup ) => {

				expect( hvcGroup ).toEqual( getBackendStub( '/hvc_groups/') );
				done();
			} );
		} );
	} );

	describe( 'Getting an hvc group', function(){
	
		it( 'Should use the hvc group transformer', function( done ){

			returnStub( '/hvc_groups/group' );
	
			backendService.getHvcGroup( alice, '3' ).then( () => {

				expect( hvcGroupSpy ).toHaveBeenCalled();
				expect( hvcGroupSpy.calls.count() ).toEqual( 1 );
				done();
			} );
		} );
	} );

	describe( 'Getting an hvc group campaigns', function(){
	
		it( 'Should use the campaigns transformer', function( done ){

			returnStub( '/hvc_groups/campaigns' );
	
			backendService.getHvcGroupCampaigns( alice, '3' ).then( () => {

				expect( campaignsSpy ).toHaveBeenCalled();
				expect( campaignsSpy.calls.count() ).toEqual( 1 );
				done();	
			} );
		} );
	} );

	describe( 'Getting an hvc group months', function(){
	
		it( 'Should use the months transformer', function( done ){

			returnStub( '/hvc_groups/months' );
	
			backendService.getHvcGroupMonths( alice, '3' ).then( () => {

				expect( monthsSpy ).toHaveBeenCalled();
				expect( monthsSpy.calls.count() ).toEqual( 1 );
				done();
			} );
		} );
	} );
} );
