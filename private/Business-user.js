const express = require( 'express' );
const cookieParser = require( 'cookie-parser' );
const path = require( 'path' );
const con = require( './Database.js' );
const router = express.Router();

////////////////////////////////////////////////////////////////////////////////////////////////

router.use( cookieParser( ) );
router.use( express.static( 
    path.join( __dirname, '..', 'public', 'Business-Page', 'Business-Page-home' ) 
) );
router.use( express.static( 
    path.join( __dirname, '..', 'public', 'Business-Page', 'Business-Page-login' )
) );
// router.use( express.static( 
//     path.join( __dirname, 'public/Business-Page/Business-Page-register' ) 
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

    const mapCookies = response.locals.cookie;
    const username = mapCookies.slice(1);
        response.redirect( '/' + mapCookies.lge );
    response.sendFile(
        path.join( __dirname, '..', 'public', 'Business-Page', 'Business-Page-home', 'Business-Page-home.html' )
    );

} );

////////////////////////////////////////////////////////////////////////////////////////////////

router.get( '/prequery', ( request, response ) => {

    response.clearCookie( 'lge' );
    response.clearCookie( 'usr_c' );
    response.send( 'Cookie have been killed successfully' );

} );

////////////////////////////////////////////////////////////////////////////////////////////////

router.get( '/setcookie', ( request, response ) => {

    response.cookie( 'username', 'encrypted cookie string Value', {
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
    response.clearCookie( 'username' );
    response.send( 'Cookie has been deleted successfully' );

});

////////////////////////////////////////////////////////////////////////////////////////////////

// define the login route

router.get( '/register', ( request, response ) => {

    response.sendFile(
        path.join( __dirname, '..', 'public', 'Business-Page', 'Business-Page-register', 'Business-Page-register.html' )
    );

} );

router.post( '/process_register', ( request, response ) => {

    const data = request.body;

} )

router.get( '/login', ( request, response ) => {


    response.sendFile(
        path.join( __dirname, '..', 'public', 'Business-Page', 'Business-Page-login', 'Business-Page-login.html' )
    );

} );

router.post( '/process_login', ( request, response ) => {

    const data = request.body;
    console.log( data );
    var sql = "Select * from account where LastName = ?";
    con.execute( sql, [ "White" ], function( error, result ) { // , fields) {
        if( error ) {
            console.log( error );
            return;
        }
        console.log( result );
        //console.log(fields);
    } );

} );




////////////////////////////////////////////////////////////////////////////////////////////////

module.exports = router;