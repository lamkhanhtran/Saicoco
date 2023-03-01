module.exports = { 
    
    hashData: function( datum ) {

        const { createHash } = require( 'crypto' );
        return createHash( 'sha256' ).update( datum ).digest( 'hex' );

    },


    generateAPI: function( ) {

        return [ ...Array( 32 ) ]
            .map( ( e ) => ( ( Math.random( ) * 36 ) | 0 ).toString( 36 ) )
            .join( '' );

    },

    createCustomer: function( data ) {

        let user = {
            username: data.username,
            password: data.password,
            phoneNumber: data.phoneNumber,
            email: data.email,
            //country: ""
            //city: "",
            //postal_code: ""
        } 

    },

    createBusinessUser: function( data ) {

        let user = {
            username: data.username,
            password: data.password,
            phoneNumber: data.phoneNumber,
            email: data.email,
            address: {

                postalCode: ""
            }
            //country: ""
            //city: "",
            //postal_code: ""
        }

    }
}