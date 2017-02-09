const jsf = require( 'json-schema-faker' );
const path = require( 'path' );

const writeFiles = require( '../../helpers/write-files' );
const calculateTotals = require( './lib/calculate-totals' );
const calculateExportTotals = require( './lib/calculate-export-totals' );
const calculateUnconfirmedPercent = require( './lib/calculate-unconfirmed-percent' );
const createMonthDate = require( './lib/create-month-date' );

const indexSchema = require( '../../../schema/backend/shared/index.schema' );
const sectorSchema = require( '../../../schema/backend/shared/sector.schema' );
const campaignsSchema = require( '../../../schema/backend/shared/campaigns.schema' );
const monthsSchema = require( '../../../schema/backend/shared/months.schema' );
const nonHvcSchema = require( '../../../schema/backend/shared/top_non_hvcs.schema' );

let files = [];
let outputPath = path.resolve( __dirname, '../output/shared/' );

let sectorTeamJson = {
	index: jsf( indexSchema ),
	sector: jsf( sectorSchema ),
	campaigns: jsf( campaignsSchema ),
	months: jsf( monthsSchema ),
	top_non_hvcs: jsf( nonHvcSchema )
};

calculateTotals( sectorTeamJson.sector.wins, [ 'non_export' ] );
calculateTotals( sectorTeamJson.sector.wins.export, [ 'hvc', 'non_hvc' ] );
calculateExportTotals( sectorTeamJson.sector.wins.export );

for( let campaign of sectorTeamJson.campaigns.campaigns ){

	calculateTotals( campaign.totals, [ 'hvc' ] );
	calculateUnconfirmedPercent( campaign.totals, [ 'progress' ] );
}

for( let month of sectorTeamJson.months.months ){

	createMonthDate( month );
	calculateTotals( month.totals, [ 'non_export' ] );
	calculateTotals( month.totals.export, [ 'hvc', 'non_hvc' ] );
	calculateExportTotals( month.totals.export );
}


for( let file in sectorTeamJson ){

	const json = JSON.stringify( sectorTeamJson[ file ], null, 3 );
	const fileName = ( outputPath + '/' + file + '.json' );

	files.push( [ fileName, json ] );
}

writeFiles( files );
