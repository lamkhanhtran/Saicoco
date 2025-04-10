const express = require( 'express' );                           // Set up the page html, css and javascript and receive data from page
                                                                // This is the main router server

///////////////////////////////////////////////////////////////////////////////////
//const cookieParser = require( 'cookie-parser' );      // Set up cookie to sites//
///////////////////////////////////////////////////////////////////////////////////

const https = require( 'https' );                               // Allow node.js to transfer file into http

const fs = require( 'fs' );                                     // Read files

const path = require( 'path' );                                 // Join directory and file name together

const helmet = require( 'helmet' );                             // Securing ‘express’ applications by setting various HTTP headers
                                                                // It helps in mitigating cross-site scripting attacks, misissued SSL certificates, etc.

const PORT = 8082;                                              // The port that this page is using

const HOST = '0.0.0.0';

////////////////////////////////////////////////////////
//const prequery_route = require( './Prequery-user' );//
//const normal_route = require( './Normal-user' );    //
//const business_route = require( './Business-user' );//
//const customer_route = require( './Customer-user' );//
////////////////////////////////////////////////////////

const page_route_v1 = require( './v1-nodejs.js' );              // Contains router GET and POST request for the page itself

const app = express( );                                         // Set up the app to be the main server itself

/*var server = https.createServer( 

    // Provide the private key and public key to the server by reading each
    // file's content with the readFileSync() method.
    {
        key: fs.readFileSync( 'key.pem' ),
        cert: fs.readFileSync( 'cert.pem' )
    },
    app

);                                                              // Set up the server that is secured by the private key and the public key
                                                                // When using nginx we actually don't need to setup the https server since nginx will setup it instead
*/

app.use( express.urlencoded( { extended: true } ) );            // We need express.urlencoded and express.json to
app.use( express.json( ) );                                     // transform data received by server to become understandable by the server

app.use( helmet( ) );                                           // Protect https server from some ways of hacking

//////////////////////////////////////////////////////////////////////////
//app.use( ( request, response, next ) => {                             //
//                                                                      //
//    const { headers: { cookie } } = request;                          //
//    if( cookie ) {                                                    //
//        const values = cookie.split( ';' ).reduce( ( res, item ) => { //
//            const data = item.trim( ).split( '=' );                   //
//            return { ...res, [ data[ 0 ] ]: data[ 1 ] };              //
//        }, { } );                                                     //
//        response.locals.cookie = values;                              //
//    }                                                                 //
//    else response.locals.cookie = { };                                //
//    next( );                                                          //
//                                                                      //
//} );                                                                  //
//////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////
//app.use( /^\/..\/business/, business_route );//
//app.use( /^\/../, normal_route );            //
//app.use( '/', prequery_route );              //
/////////////////////////////////////////////////

//app.use( '/*/customer', customer_route );
//app.use( '/*/others', others_route );

app.use( '/', page_route_v1 );                                  // Using POST and GET request from the main server itself

app.all( '*', function( request, response ) {                   // To other links that doesn't accessible by the server received the error page

    response.status( 404 ).sendFile( 
        path.join( __dirname, "..", "public", "Page-v1", "Error_Page.html" )
    );

} );



// Right now I have a database which is dbTest
// This database has a table name 'account'
// Inside that table I have columns { "PersonID", "LastName", "FirstName", "Address", "City"}

/*
var sql = "Select * from account where LastName = ?";
con.execute( sql, ["White"], function( error, result ) { // , fields) {
    if(error) {
        console.log( error );
        return;
    }
    console.log( result );
    //console.log(fields);
} );
*/

/*
server.listen( PORT, function( error ) {                        // Listening through the port that we declared earlier

    if( error )                                                 // If cannot listen, return error
        console.log( error );
    console.log( 'Server listening on PORT', PORT );            // Printing that the server is created

} );
*/
/*const express = require('express');
const path = require('path');
const app = express();
const PORT = 8082;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (request, response) {
    response.sendFile(path.join(__dirname, 'public/Users-types.html'))
});
*/
app.listen( PORT, HOST, ( error ) => {

    if( error )                                                 // If cannot listen, return error
        console.log( error );

    console.log( `Server listening on PORT ${PORT}` );          // Printing that the server is created

} );
