const generateSchema = require( './lib/generate-schema' );
const calculateTarget = require( './lib/calculate-target' );
const calculateConfirmedPercentages = require( './lib/calculate-confirmed-percentages' );

module.exports = {

	createOverview: function(){
		
		let overview = generateSchema( '/os_regions/overview.schema' );

		for( let region of overview ){

			calculateConfirmedPercentages( region.confirmed_percent );
			calculateTarget( region.hvc_target_values );
		}

		return overview;
	}
};
