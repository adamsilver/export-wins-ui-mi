const jsf = require( 'json-schema-faker' );
const helpers = require( './helpers/backend' );
const path = require( 'path' );

const sectorTeamSchema = require( '../schema/backend/sector_teams/sector_team.schema' );
const campaignsSchema = require( '../schema/backend/sector_teams/campaigns.schema' );
const monthsSchema = require( '../schema/backend/sector_teams/months.schema' );
const nonHvcSchema = require( '../schema/backend/sector_teams/top_non_hvcs.schema' );
const overviewSchema = require( '../schema/backend/sector_teams/overview.schema' );

let files = [];
let outputPath = path.resolve( __dirname, 'backend/sector_teams/' );

let sectorTeamJson = {

	sector_team: jsf( sectorTeamSchema ),
	campaigns: jsf( campaignsSchema ),
	months: jsf( monthsSchema ),
	top_non_hvcs: jsf( nonHvcSchema ),
	overview: jsf( overviewSchema )
};


helpers.calculateValues( sectorTeamJson.sector_team.wins, [ 'non_export' ] );
helpers.calculateValues( sectorTeamJson.sector_team.wins.export, [ 'hvc', 'non_hvc' ] );
helpers.calculateExportTotals( sectorTeamJson.sector_team.wins.export );

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

for( let sector of sectorTeamJson.overview ){

	helpers.calculateTotal( sector.hvc_target_values );
	helpers.calculateConfirmedPercentages( sector.confirmed_percent );

	for( let hvcGroup of sector.hvc_groups ){

		helpers.calculateTotal( hvcGroup.hvc_target_values );
		helpers.calculateConfirmedPercentages( hvcGroup.confirmed_percent );
	}
}

for( let file in sectorTeamJson ){

	const json = JSON.stringify( sectorTeamJson[ file ], null, 3 );
	const fileName = ( outputPath + '/' + file + '.json' );

	files.push( [ fileName, json ] );
}

helpers.writeFiles( files );
