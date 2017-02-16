const nock = require( 'nock' );
const config = require( '../../../app/config' );
const getBackendStub = require( './get-backend-stub' );

module.exports = {

	getStub: function( path, statusCode, stubPath ){

		let data;

		if( stubPath ){

			data = getBackendStub( stubPath );
		}

		return nock( config.backend.href ).get( path ).reply( statusCode, data );
	}
};
