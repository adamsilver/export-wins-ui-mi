
const backendService = require( '../lib/service/service.backend' );
const renderError = require( '../lib/render-error' );

const sectorPerformanceDataSet = require( '../lib/data-sets/sector-performance' );
const hvcTargetPerformanceDataSet = require( '../lib/data-sets/hvc-target-performance' );
const sectorSummary = require( '../lib/view-models/sector-summary' );
const hvcSummary = require( '../lib/view-models/sector-hvc-summary' );

module.exports = {

	list: function( req, res ){

		backendService.getHvcGroups( req.alice ).then( ( hvcGroups ) => {

			res.render( 'hvc-groups/list.html', { hvcGroups } );

		} ).catch( renderError.createHandler( res ) );
	},

	group: function( req, res ){

		const groupId = req.params.id;

		backendService.getHvcGroupInfo( req.alice, groupId ).then( ( data ) => {

			const winsData = data[ 0 ];
			const months = data[ 1 ];
			const	campaigns = data[ 2 ];

			res.render( 'hvc-groups/detail.html', {
				sectorName: winsData.name,
				summary: sectorSummary.create( winsData ),
				hvcSummary: hvcSummary.create( winsData ),
				sectorPerformance: sectorPerformanceDataSet.create( months ),
				hvcTargetPerformance: hvcTargetPerformanceDataSet.create( campaigns )
			} );

		} ).catch( renderError.createHandler( res ) );
	}
};
