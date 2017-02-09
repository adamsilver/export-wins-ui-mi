const jsf = require( 'json-schema-faker' );
const helpers = require( './helpers/backend' );
const path = require( 'path' );

const indexSchema = require( '../schema/backend/shared/index.schema' );
const sectorSchema = require( '../schema/backend/shared/sector.schema' );
const campaignsSchema = require( '../schema/backend/shared/campaigns.schema' );
const monthsSchema = require( '../schema/backend/shared/months.schema' );
const nonHvcSchema = require( '../schema/backend/shared/top_non_hvcs.schema' );

let files = [];
let outputPath = path.resolve( __dirname, 'backend/shared/' );

let sectorTeamJson = {
	index: jsf( indexSchema ),
	sector: jsf( sectorSchema ),
	campaigns: jsf( campaignsSchema ),
	months: jsf( monthsSchema ),
	top_non_hvcs: jsf( nonHvcSchema )
};


helpers.calculateValues( sectorTeamJson.sector.wins, [ 'non_export' ] );
helpers.calculateValues( sectorTeamJson.sector.wins.export, [ 'hvc', 'non_hvc' ] );
helpers.calculateExportTotals( sectorTeamJson.sector.wins.export );

for( let campaign of sectorTeamJson.campaigns.campaigns ){

	helpers.calculateValues( campaign.totals, [ 'hvc' ] );
	helpers.calculatePercentages( campaign.totals, [ 'progress' ] );
}

for( let month of sectorTeamJson.months.months ){

	helpers.createMonthDate( month );
	helpers.calculateValues( month.totals, [ 'non_export' ] );
	helpers.calculateValues( month.totals.export, [ 'hvc', 'non_hvc' ] );
	helpers.calculateExportTotals( month.totals.export );
}


for( let file in sectorTeamJson ){

	const json = JSON.stringify( sectorTeamJson[ file ], null, 3 );
	const fileName = ( outputPath + '/' + file + '.json' );

	files.push( [ fileName, json ] );
}

helpers.writeFiles( files );
