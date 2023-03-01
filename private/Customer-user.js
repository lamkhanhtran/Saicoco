const express = require( 'express' );
const cookieParser = require( 'cookie-parser' );
const path = require( 'path' );
const router = express.Router( );

////////////////////////////////////////////////////////////////////////////////////////////////

router.use( cookieParser( ) );
router.use( express.static(
    path.join( __dirname, '..', 'public', 'Normal-Page', 'Normal-Page-home' )
) );
router.use( express.static(
    path.join( __dirname, '..', 'public', 'Normal-Page', 'Normal-Page-about' )
) );

////////////////////////////////////////////////////////////////////////////////////////////////

router.use( ( request, response, next ) => {

    console.log( 'Time: ', Date.now( ) );
    next( );

} );

////////////////////////////////////////////////////////////////////////////////////////////////

router.get( '/', function( request, response ) {

    const mapCookies = response.locals.cookie;
    if( "usr_c" in mapCookies ){
        if( mapCookies[ "usr_c" ][ 0 ] == 'B' )
            response.redirect( "/business" );
        else if( mapCookies[ "usr_c" ][ 0 ] == 'C')
            response.redirect( "/customer" );
    }
    else
        response.sendFile(
            path.join( __dirname, '..', 'public', 'Normal-Page', 'Normal-Page-home', 'Normal-Page-home.html' )
        );

} );

////////////////////////////////////////////////////////////////////////////////////////////////

module.exports = router;