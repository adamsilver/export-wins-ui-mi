const transform = require( '../../../../../app/lib/transformers/campaigns' );
const sectorTeamCampaigns = require( '../../../../../stubs/backend/sector_teams/campaigns' );
const hvcGroupCampaigns = require( '../../../../../stubs/backend/hvc_groups/group_campaigns' );
const osRegionCampaigns = require( '../../../../../stubs/backend/os_regions/campaigns' );

describe( 'Sector campaigns transformer', function(){

	function check( input ){

		const output = transform( input );

		expect( Array.isArray( output ) ).toEqual( true );
		expect( output.length ).toBeGreaterThan( 0 );

		output.forEach( ( item ) => {

			expect( item.campaign ).toBeDefined();
			expect( item.change ).toBeDefined();
			expect( item.progress ).toBeDefined();
			expect( item.progress.confirmed ).toBeDefined();
			expect( item.progress.unconfirmed ).toBeDefined();
			expect( item.value ).toBeDefined();
			expect( item.value.confirmed ).toBeDefined();
			expect( item.value.total ).toBeDefined();
			expect( item.target ).toBeDefined();
			expect( item.status ).toBeDefined();
		} );
	}

	describe( 'Sector team', function(){
	
		it( 'Should return the correct format', function(){

			check( sectorTeamCampaigns );
		} );
	} );

	describe( 'Overseas region', function(){
	
		it( 'Should return the correct format', function(){

			check( osRegionCampaigns );
		} );
	} );

	describe( 'HVC Group Sector', function(){
	
		it( 'Should return the correct format', function(){

			check( hvcGroupCampaigns );
		} );
	} );

} );
