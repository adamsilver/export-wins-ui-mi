
const backendService = require( '../lib/service/service.backend' );
const renderError = require( '../lib/render-error' );

const sectorPerformanceDataSet = require( '../lib/data-sets/sector-performance' );
const topNonHvcDataSet = require( '../lib/data-sets/top-non-hvc' );
const targetProgressDataSet = require( '../lib/data-sets/target-progress' );
const hvcTargetPerformanceDataSet = require( '../lib/data-sets/hvc-target-performance' );
const sectorSummary = require( '../lib/view-models/sector-summary' );

module.exports = { 

	overview: function( req, res ){

		backendService.getOverseasRegionsOverview( req.alice ).then( ( regionGroups ) => {

			//console.log( JSON.stringify( regionGroups, null, 2 ) );

			res.render( 'overseas-regions/overview.html', { regionGroups } );
		
		} ).catch( renderError.createHandler( res ) );
	},

	list: function( req, res ){

		backendService.getOverseasRegions( req.alice ).then( ( regions ) => {

			res.render( 'overseas-regions/list.html', { regions } );
		
		} ).catch( renderError.createHandler( res ) );
	},

	region: function( req, res ){

		const regionId = req.params.id;

		backendService.getOverseasRegionInfo( req.alice, regionId ).then( ( data ) => {

			const winsData = data[ 0 ];
			const months = data[ 1 ];
			const topNonHvc = data[ 2 ];
			const hvcTargetPerformance = data[ 3 ];

			res.render( 'overseas-regions/detail.html', {
				
				regionName: winsData.name,
				summary: sectorSummary.create( winsData ),
				winSummary: {
					target: winsData.hvcs.target,
					totalConfirmed: winsData.wins.export.hvc.value.confirmed,
					total: winsData.wins.export.hvc.value.total,
					progress: targetProgressDataSet.create( winsData )
				},
				hvcTargetPerformance: hvcTargetPerformanceDataSet.create( hvcTargetPerformance ),
				sectorPerformance: sectorPerformanceDataSet.create( months ),
				topNonHvc,
				topNonHvcScale: topNonHvcDataSet.create( topNonHvc ),
			} );

		} ).catch( renderError.createHandler( res ) );
	}
};
