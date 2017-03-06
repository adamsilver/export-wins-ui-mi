
const backendService = require( '../lib/service/service.backend' );
const renderError = require( '../lib/render-error' );

const sectorPerformanceDataSet = require( '../lib/data-sets/sector-performance' );
const targetProgressDataSet = require( '../lib/data-sets/target-progress' );
const hvcTargetPerformanceDataSet = require( '../lib/data-sets/hvc-target-performance' );
const sectorSummary = require( '../lib/view-models/sector-summary' );

module.exports = {

	list: function( req, res ){

		backendService.getHvcGroups( req.alice ).then( ( hvcGroups ) => {

			//console.log( JSON.stringify( hvcGroups, null, 2 ) );

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
				winSummary: {
					target: winsData.hvcs.target,
					totalConfirmed: winsData.wins.export.hvc.value.confirmed,
					total: winsData.wins.export.hvc.value.total,
					progress: targetProgressDataSet.create( winsData )
				},
				sectorPerformance: sectorPerformanceDataSet.create( months ),
				hvcTargetPerformance: hvcTargetPerformanceDataSet.create( campaigns )
			} );

		} ).catch( renderError.createHandler( res ) );
	}
};
