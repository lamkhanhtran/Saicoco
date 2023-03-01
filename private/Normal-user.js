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
    if( 'lge' in mapCookies ) {
        if( 'usr_c' in mapCookies ){
            if( mapCookies[ 'usr_c' ][ 0 ] == 'B' )
                response.redirect( '/business' );
            else if( mapCookies[ 'usr_c' ][ 0 ] == 'C')
                response.redirect( '/customer' );
        }
        else
            response.sendFile(
                path.join( __dirname, '..', 'public', 'Normal-Page', 'Normal-Page-home', 'Normal-Page-home.html' )
            );
    }
    else
        response.redirect( '/..' );

} );

////////////////////////////////////////////////////////////////////////////////////////////////

router.get( '/about', function( request, response ) {

    response.sendFile(
        path.join( __dirname, '..', 'public', 'Normal-Page', 'Normal-Page-about', 'Normal-Page-about.html' )
    );

} );

////////////////////////////////////////////////////////////////////////////////////////////////

router.get( '/FAQ', function( request, response ) {

    response.sendFile(
        path.join( __dirname, '..', 'public', 'Normal-Page', 'Normal-Page-FAQ', 'Normal-Page-FAQ.html' )
    );

} );


module.exports = router;