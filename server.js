const http = require('http');
const path = require('path');
const fs = require('fs');
const dt = require('./myfirstmodule.js');

const PORT = 8082;

const pathname = [
    'Prequery-Page',
    'Business-Page'
]

const extension = [
    '.html',
    '.css',
    '.js',
]

const query_page_html = fs.readFileSync( path.join( __dirname, 'public/Language-And-User-Type-Page', pathname[ 0 ] + extension[ 0 ] ) );
const query_page_css = fs.readFileSync( path.join( __dirname, 'public/Language-And-User-Type-Page', pathname[ 0 ] + extension[ 1 ] ) );
const query_page_js = fs.readFileSync( path.join( __dirname, 'public/Language-And-User-Type-Page', pathname[ 0 ] + extension[ 2 ] ) );

const business_page_html = fs.readFileSync( path.join( __dirname, 'public/Business-Page', pathname[ 1 ] + extension[ 0 ] ) );
const business_page_css = fs.readFileSync( path.join( __dirname, 'public/Business-Page', pathname[ 1 ] + extension[ 1 ] ) );
//const business_page_js = fs.readFileSync(path.join(__dirname, 'public/Language-And-User-Type-Page', pathname[0]+extension[2]));

var server = http.createServer( function( request, response ) {
    
    var path = request.url;
    
    switch (path) {
        case '/':
        
            response.writeHead( 200, {
                'Content-Type': 'text/plain'
            });
            response.write( "This is Test Message." );
            response.end();
            break;
        
        case '/prequery-page':
        
            response.writeHead( 200, {
                'content-type': 'text/html'
            } );
            response.write( query_page_html );
            response.end();
            break;
        
        case '/en/user0':
        
            response.writeHead( 200, {
                'content-type': 'text/html'
            } );
            response.write( business_page_html );
            response.end();
            break;

        case '/en/user1':
        
            response.writeHead( 200, {
                'content-type': 'text/html'
            } );
            response.write( business_page_html );
            response.end();
            break;

        case '/en/user2':
        
            response.writeHead( 200, {
                'content-type': 'text/html'
            } );
            response.write( business_page_html );
            response.end();
            break;
        
        case '/Prequery-Page.css':
            
            response.writeHead( 200, {
                'content-type': 'text/css'
            } );
            response.write( query_page_css );
            response.end();
            break;
        
        case '/en/Business-Page.css':
         
            response.writeHead( 200, {
                'content-type': 'text/css'
            } );
            response.write( business_page_css ) ;
            response.end();
            break;
        
        case '/Prequery-Page.js':
         
            response.writeHead( 200, {
                'content-type': 'text/javascript'
            } );
            response.write( query_page_js );
            response.end();
            break;

        default:

            response.writeHead( 404 );
            response.write( "opps this doesn't exist - 404" );
            response.end();
            break;
    
    }
    
} );

var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "test_user",
  password: "_Test123_",
  database: "dbTest"
});

con.connect((err) => {
  if(err){
    console.log(err);
    return;
  }
  console.log('Connection established');
});



con.end((err) => {
  // The connection is terminated gracefully
  // Ensures all remaining queries are executed
  // Then sends a quit packet to the MySQL server.
});







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