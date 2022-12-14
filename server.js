const express = require( 'express' );                 // Set up the page html, css and javascript and receive data from page

//const cookieParser = require('cookie-parser');        // Set up cookie to sites

const http = require( 'http' );                       // Allow node.js to transfer file into http

const path = require( 'path' );                       // Join directory and file name together

const helmet = require( 'helmet' );                   // Securing ‘express’ applications by setting various HTTP headers
                                                      // It helps in mitigating cross-site scripting attacks, misissued SSL certificates, etc.

const mysql = require( 'mysql2' );                    // Cannot use mysql since it doesn't use 'mysql_native_password'
                                                      // Instead it uses 'caching_sha2_password'

const PORT = 8082;


const prequery_route = require( './Prequery-user' );
const business_route = require( './public/Business-Page/Business-user' );
//const customer_route = require( './Customer-user' );
//const others_route = require( './Other-user' );


const app = express();

var server = http.createServer( app );


app.use( express.urlencoded( { extended: true } ) );                    // We need express.urlencoded and express.json to
app.use( express.json() );                                              // transform data received by server become understandable
app.use( helmet() );                                                    // Protect http


app.use( '/', prequery_route );
app.use( '/*/business', business_route );
//app.use( '/*/customer', customer_route );
//app.use( '/*/others', others_route );


app.all('*', (req, res) => {
    res.status(404).send('<h1>404! Page not found</h1>');
} );



// Right now I have a database which is dbTest
// This database has a table name 'account'
// Inside that table I have columns { "PersonID", "LastName", "FirstName", "Address", "City"}

/*var con = mysql.createPool({               // Create a cache to remember users so that users can reconnect easily
    host                  : "localhost",   // Host
    user                  : "test_user",   // Username of database
    password              : "_Test123_",   // Password for username
    database              : "dbTest",      // Database you want to access, if not you can change to other database
    waitForConnections    : true,          // If max amount is reached, if let people wait for a slot, true, else false and return error page
    connectionLimit       : 99,            // Max amount of users allowed accessing the database
    queueLimit            : 0              // Limit on how many requests database can take, 0 for unlimited
});


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



server.listen( PORT, function( error ){
    if( error )
        console.log( error );
    console.log( "Server listening on PORT", PORT );
} );
/*const express = require('express');
const path = require('path');
const app = express();
const PORT = 8082;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (request, response) {
    response.sendFile(path.join(__dirname, 'public/Users-types.html'))
});

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
});*/