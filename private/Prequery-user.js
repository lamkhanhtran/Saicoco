                                                                                            //
const express = require( 'express' );                                                       //
//const cookieParser = require( 'cookie-parser' );                                            //
const path = require( 'path' );                                                             //
const router = express.Router( );                                                           //
                                                                                            //
//////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////
                                                                                            //
const data = require( '../languages.json' );                                                //
                                                                                            //
//////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////
                                                                                            //
//router.use( cookieParser( ) );                                                              //
router.use( express.static(                                                                 //
    path.join( __dirname, '..', 'public', 'Prequery-Page' )                                 //
) );                                                                                        //
                                                                                            //
//////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////
                                                                                            //
router.use( ( request, response, next ) => {                                                //
                                                                                            //
    console.log( 'Time: ', Date.now( ) );                                                   //
    next( );                                                                                //
                                                                                            //
} );                                                                                        //
                                                                                            //
//////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////
                                                                                            //
router.get( '/', function( request, response ) {                                            //
                                                                                            //
    //const mapCookies = response.locals.cookie;                                              //
    //if( 'lge' in mapCookies )                                                               //
    //    response.redirect( '/' + mapCookies.lge );                                          //
    //else                                                                                    //
    //    response.sendFile(                                                                  //
    //        path.join( __dirname, '..', 'public', 'Prequery-Page', 'Prequery-Page.html' )   //
    //    );                                                                                  //
    response.send( "welcome to server");
                                                                                            //
} );                                                                                        //
                                                                                            //
//////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////
                                                                                            //
router.get( '/languages.json', function( request, response ) {                              //
                                                                                            //
    response.header( 'Content-Type', 'application/json' );                                  //
    response.json( data );                                                                  //
                                                                                            //
} );                                                                                        //
                                                                                            //
//////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////
                                                                                            //
router.post( '/language', function( request, response ) {                                   //
                                                                                            //
    const language = request.body.language;                                                 //
    console.log( language );                                                                //
    //response.cookie( 'lge', language );                                                     //
    response.redirect( '/' + language );                                                    //
                                                                                            //
} );                                                                                        //
                                                                                            //
//////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////
                                                                                            //
module.exports = router;                                                                    //
                                                                                            //
//////////////////////////////////////////////////////////////////////////////////////////////