const express = require( 'express' );
const cookieParser = require( 'cookie-parser' );
const path = require( 'path' );
const router = express.Router();

////////////////////////////////////////////////////////////////////////////////////////////////

router.use( cookieParser() );
router.use( express.static( 
    path.join( __dirname, 'public', 'Business-Page', 'Business-Page-home' ) 
) );
router.use( express.static( 
    path.join( __dirname, 'public', 'Business-Page', 'Business-Page-login' )
) );
// router.use( express.static( 
//     path.join( __dirname, 'public/Business-Page/Business-Page-signup' ) 
// ) );
// router.use( express.static( 
//     path.join( __dirname, 'public/Business-Page/Business-Page-product' ) 
// ) );

////////////////////////////////////////////////////////////////////////////////////////////////

router.use( ( request, response, next ) => {

    console.log( 'Time: ', Date.now() );
    next();

} );

////////////////////////////////////////////////////////////////////////////////////////////////

// define the home page route
router.get( '/', ( request, response ) => {

    response.sendFile(
        path.join( __dirname, 'public', 'Business-Page', 'Business-Page-home', 'Business-Page-home.html' )
    );

} );

////////////////////////////////////////////////////////////////////////////////////////////////

router.post( '/prequery', ( request, response ) => {

    response.clearCookie( 'lge' );
    response.clearCookie( 'usr_t' );

} );

////////////////////////////////////////////////////////////////////////////////////////////////

router.get( '/setcookie', ( request, response ) => {

    response.cookie( 'acc', 'encrypted cookie string Value', {
        maxAge: 365 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: true,
        sameSite: 'lax'
    } );
    response.send( 'Cookie have been saved successfully' );

} );

////////////////////////////////////////////////////////////////////////////////////////////////

router.get( '/getcookie', ( request, response ) => {

    //show the saved cookies
    console.log( request.cookies );
    response.send( request.cookies );

});

////////////////////////////////////////////////////////////////////////////////////////////////

router.get( '/deletecookie', ( request, response ) => {

    //show the saved cookies
    response.clearCookie( 'Cookie token name' );
    response.send( 'Cookie has been deleted successfully' );

});

////////////////////////////////////////////////////////////////////////////////////////////////

// define the login route
router.get( '/login', ( request, response ) => {

    response.sendFile(
        path.join( __dirname, 'public', 'Business-Page', 'Business-Page-login', 'Business-Page-login.html' )
    );

} );

router.post( '/process_login', ( request, response ) => {

    const data = request.body;
    console.log( data );

} );

////////////////////////////////////////////////////////////////////////////////////////////////

module.exports = router;