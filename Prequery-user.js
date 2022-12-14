const express = require( 'express' );
const cookieParser = require( 'cookie-parser' );
const path = require( 'path' );
const router = express.Router();

////////////////////////////////////////////////////////////////////////////////////////////////

const data = require( './languages.json' );

////////////////////////////////////////////////////////////////////////////////////////////////

router.use( ( request, response, next) => {
    
    const { headers: { cookie } } = request;
    if( cookie ) {
        const values = cookie.split(';').reduce( ( res, item ) => {
            const data = item.trim().split('=');
            return { ...res, [data[0]]: data[1] };
        }, { } );
        response.locals.cookie = values;
    }
    else response.locals.cookie = {};
    next();

} );

////////////////////////////////////////////////////////////////////////////////////////////////

router.use( express.static( path.join( __dirname, 'public/Prequery-Page' ) ) );

////////////////////////////////////////////////////////////////////////////////////////////////

var language, user;

////////////////////////////////////////////////////////////////////////////////////////////////

router.use( ( request, response, next ) => {

    console.log( 'Time: ', Date.now() );
    next();

} );

////////////////////////////////////////////////////////////////////////////////////////////////

router.get( '/', function( request, response ) {

    const mapCookies = response.locals.cookie;
    console.log( mapCookies );

    response.sendFile(
        path.join( __dirname, 'public/Prequery-Page/Prequery-Page.html' ),
    );

} );

////////////////////////////////////////////////////////////////////////////////////////////////

router.get( '/languages.json', function( request, response ) {

    response.header( 'Content-Type', 'application/json' );
    response.json( data );

} );

////////////////////////////////////////////////////////////////////////////////////////////////

router.post( '/language', function( request, response ) {

    response.cookie( 'lge', request.body.language );
    language = request.body.language;
    console.log( language );
    response.sendStatus( 200 );

} );

////////////////////////////////////////////////////////////////////////////////////////////////

router.post( '/user_type', function( request, response ) {

    response.cookie( 'usr_t', request.body.user );
    user = request.body.user;
    console.log( user );
    response.sendStatus( 200 );

} );

////////////////////////////////////////////////////////////////////////////////////////////////
module.exports = router;