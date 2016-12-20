const isTopNonHvc = /^\/mi\/sector_teams\/[0-9]+\/top_non_hvcs\/$/;
const isSectorCampaign = /^\/mi\/sector_teams\/[0-9]+\/campaigns\/$/;
const isSectorMonths = /^\/mi\/sector_teams\/[0-9]+\/months\/$/;
const isSector = /^\/mi\/sector_teams\/[0-9]+\/$/;
const isSectors = /^\/mi\/sector_teams\/$/;

const isRegionTopNonHvc = /^\/mi\/regions\/[0-9]+\/top_non_hvcs\/$/;
const isRegionCampaigns = /^\/mi\/regions\/[0-9]+\/campaigns\/$/;
const isRegionMonths = /^\/mi\/regions\/[0-9]+\/months\/$/;
const isRegion = /^\/mi\/regions\/[0-9]+\/$/;

const okStatus = { statusCode: 200 };

const topNonHvcStub = require( '../../stubs/backend/top_non_hvc_2016-12-12' );
const sectorCampaignStub = require( '../../stubs/backend/sector_team_campaigns_2016-12-12' );
const sectorMonthsStub = require( '../../stubs/backend/sector_team_months_2016-12-12' );
const sectorStub = require( '../../stubs/backend/sector_team_v2' );
const sectorsStub = require( '../../stubs/backend/sector_teams' );

const regionTopNonHvcStub = require( '../../stubs/backend/region_top_non_hvc' );
const regionCampaignsStub = require( '../../stubs/backend/region_campaigns' );
const regionMonthsStub = require( '../../stubs/backend/region_months' );
const regionStub = require( '../../stubs/backend/region' );

const stubs = [

	[ isTopNonHvc, topNonHvcStub ],
	[ isSectorCampaign, sectorCampaignStub ],
	[ isSectorMonths, sectorMonthsStub ],
	[ isSector, sectorStub ],
	[ isSectors, sectorsStub ],

	[ isRegionTopNonHvc, regionTopNonHvcStub ],
	[ isRegionCampaigns, regionCampaignsStub ],
	[ isRegionMonths, regionMonthsStub ],
	[ isRegion, regionStub ]
];

module.exports = {

	get: function( url, cb ){

		let data;
		let path;
		let stub;

		for( [ path, stub ] of stubs ){

			if( path.test( url ) ){

				data = stub;
				break;
			}
		}

		if( data ){

			cb( null, okStatus, data );

		} else {

			cb( new Error( 'Stub not matched' ) );
		}
	}
};
