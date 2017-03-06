
const backendService = require( '../lib/service/service.backend' );
const renderError = require( '../lib/render-error' );

const sectorPerformanceDataSet = require( '../lib/data-sets/sector-performance' );
const topNonHvcDataSet = require( '../lib/data-sets/top-non-hvc' );
const hvcTargetPerformanceDataSet = require( '../lib/data-sets/hvc-target-performance' );
const sectorSummary = require( '../lib/view-models/sector-summary' );
const hvcSummary = require( '../lib/view-models/sector-hvc-summary' );

module.exports = {

	overview: function( req, res ){

		backendService.getSectorTeamsOverview( req.alice ).then( ( sectorTeams ) => {
			
			res.render( 'sector-teams/overview', { sectorTeams } );
			
		} ).catch( renderError.createHandler( res ) );
	},

	list: function( req, res ){

		backendService.getSectorTeams( req.alice ).then( ( sectorTeams ) => {

			res.render( 'sector-teams/list.html', { sectorTeams } );

		} ).catch( renderError.createHandler( res ) );
	},

	team: function( req, res ){

		const teamId = req.params.id;

		backendService.getSectorTeamInfo( req.alice, teamId ).then( ( data ) => {

			const winsData = data[ 0 ];
			const months = data[ 1 ];
			const topNonHvc = data[ 2 ];
			const campaigns = data[ 3 ];

			res.render( 'sector-teams/detail.html', {
				
				sectorName: ( winsData.name + ' Sector Team' ),
				summary: sectorSummary.create( winsData ),
				hvcSummary: hvcSummary.create( winsData ),
				hvcTargetPerformance: hvcTargetPerformanceDataSet.create( campaigns ),
				sectorPerformance: sectorPerformanceDataSet.create( months ),
				topNonHvc,
				topNonHvcScale: topNonHvcDataSet.create( topNonHvc )
			} );

		} ).catch( renderError.createHandler( res ) );
	}
};
