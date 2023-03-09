const express = require( 'express' );                           // Set up the page html, css and javascript and receive data from page
                                                                // This is the side router server
    
//const cookieParser = require( 'cookie-parser' );

const fs = require( 'fs' );                                     // Read files

const path = require( 'path' );                                 // Join directory and file name together

const helmet = require( 'helmet' );                             // Securing ‘express’ applications by setting various HTTP headers
                                                                // It helps in mitigating cross-site scripting attacks, misissued SSL certificates, etc.

const multer = require( 'multer' );                             // Allow to execute files data

const storage = multer.diskStorage( {                           // Describe how to execute the storing ( either disk or memory )

    destination: function( request, file, callback ) {          // Destination where to store
        callback( null, './public/Page-v1' );
    },

    filename: function( request, file, callback ) {             // How the file will be name
        callback( null, file.fieldname + '-' + Date.now() + '.png' );
    }

} );

const upload = multer( { storage: storage } );                  // Describe how to upload files onto the database

const connection = require( './Database' );                     // Accessing the mysql database

const { generateAPI, hashData } = require( './API' );           // Application Programming Interface for creating API code and hashing data

const router = express.Router( );                               // Set up the app to be the side server itself

////////////////////////////////////////////////////////////////////////////////////////////////

//router.use( cookieParser( ) );
router.use( express.static(                                     // Let router access different path files without the need to declare full path
    path.join( __dirname, '..', 'public', 'Page-v1' )           // Path to the html, javascript and css files
) );

////////////////////////////////////////////////////////////////////////////////////////////////

/*router.use( ( request, response, next ) => {

    console.log( 'Time: ', Date.now( ) );
    next( );

} );*/

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                                                //
router.get( '/PRODUCTS', function( request, response ) {                                                                                        //
                                                                                                                                                //
    const sql = 'SELECT Items.id, itemName, image, quantity, price FROM Sellers, Items WHERE Sellers.id=Items.sellerId';                        //
                                                                                                                                                //
    connection.execute( sql, function( error, result ) {                                                                                        //
        if( error ) {                                                                                                                           //
            console.log( error );                                                                                                               //
            return;                                                                                                                             //
        }                                                                                                                                       //
        response.header( 'Content-Type', 'application/json' );                                                                                  //
        response.json( result );                                                                                                                //
    } );                                                                                                                                        //
                                                                                                                                                //
} );                                                                                                                                            //
                                                                                                                                                //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                                                //
router.get( '/ITEMID/:id', function( request, response ) {                                                                                      //
                                                                                                                                                //
    const sql = 'SELECT itemName, image, quantity, price, companyName, phoneNumber FROM Sellers, Items '                                        //
              + 'WHERE sellerId=Sellers.id and Items.id=?';                                                                                     //
                                                                                                                                                //
    connection.execute( sql, [ request.params.id ], function( error, result ) {                                                                 //
        if( error ) {                                                                                                                           //
            console.log( error );                                                                                                               //
            return;                                                                                                                             //
        }                                                                                                                                       //
        response.header( 'Content-Type', 'application/json' );                                                                                  //
        response.json( result );                                                                                                                //
    } );                                                                                                                                        //
                                                                                                                                                //
} );                                                                                                                                            //
                                                                                                                                                //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                                                //
router.get( '/ITEMORDERED/:code', function( request, response ) {                                                                               //
                                                                                                                                                //
    const sql = 'SELECT itemName, image, Orders.id FROM Orders, Items WHERE Items.id=itemId and vertifyCode=?';                                 //
                                                                                                                                                //
    connection.execute( sql, [ request.params.code ], function( error, result ) {                                                               //
        if( error ) {                                                                                                                           //
            console.log( error );                                                                                                               //
            return;                                                                                                                             //
        }                                                                                                                                       //
        response.header( 'Content-Type', 'application/json' );                                                                                  //
        response.json( result );                                                                                                                //
    } );                                                                                                                                        //
                                                                                                                                                //
} );                                                                                                                                            //
                                                                                                                                                //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                                                //
router.get( '/ITEMSELLING/:uid/:iid?', function( request, response ) {                                                                          //
                                                                                                                                                //
    const sql = 'SELECT Items.id, itemName, image, quantity, price FROM Sellers, Items WHERE Sellers.id=Items.sellerId and Sellers.id=?'        //
              + ( !request.params.iid ? '' : ' and Items.id=?' );                                                                               //
                                                                                                                                                //
    //console.log(sql);                                                                                                                         //
                                                                                                                                                //
    connection.execute( sql,                                                                                                                    //
        ( !request.params.iid ? [ request.params.uid ] : [ request.params.uid, request.params.iid ] ),                                          //
        function( error, result ) {                                                                                                             //
        if( error ) {                                                                                                                           //
            console.log( error );                                                                                                               //
            return;                                                                                                                             //
        }                                                                                                                                       //
        response.header( 'Content-Type', 'application/json' );                                                                                  //
        response.json( result );                                                                                                                //
    } );                                                                                                                                        //
                                                                                                                                                //
} );                                                                                                                                            //
                                                                                                                                                //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                                                //
router.get( '/ORDERRECEIVED/:uid', function( request, response ) {                                                                              //
                                                                                                                                                //
    const sql = 'SELECT Orders.id, Orders.time, Users.phoneNumber, Items.itemName '
              + 'FROM Orders, Users, Sellers, Items '
              + 'WHERE Orders.userId=Users.id and Orders.itemId=Items.id and Items.sellerId=Sellers.id and Sellers.id=?';                                                                               //
                                                                                                                                                //
    //console.log(sql);                                                                                                                         //
                                                                                                                                                //
    connection.execute( sql, [ request.params.uid ], function( error, result ) {                                                                                                             //
        if( error ) {                                                                                                                           //
            console.log( error );                                                                                                               //
            return;                                                                                                                             //
        }                                                                                                                                       //
        response.header( 'Content-Type', 'application/json' );                                                                                  //
        response.json( result );                                                                                                                //
    } );                                                                                                                                        //
                                                                                                                                                //
} );                                                                                                                                            //
                                                                                                                                                //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                //
router.get( '/', function( request, response ) {                                                                //
                                                                                                                //
    response.sendFile(                                                                                          //
        path.join( __dirname, '..', 'public', 'Page-v1', 'Home_Page.html' )                                     //
    );                                                                                                          //
                                                                                                                //
} );                                                                                                            //
                                                                                                                //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                //
router.get( '/access', function( request, response ) {                                                          //
                                                                                                                //
    response.sendFile(                                                                                          //
        path.join( __dirname, '..', 'public', 'Page-v1', 'SignIn_SignUp_Page.html' )                            //
    );                                                                                                          //
                                                                                                                //
} );                                                                                                            //
                                                                                                                //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                //
router.get( '/buying', function( request, response ) {                                                          //
                                                                                                                //
    response.sendFile(                                                                                          //
        path.join( __dirname, '..', 'public', 'Page-v1', 'Products_Page.html' )                                 //
    );                                                                                                          //
                                                                                                                //
} );                                                                                                            //
                                                                                                                //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                //
router.get( '/item', function( request, response ) {                                                            //
                                                                                                                //
    const sql = 'SELECT id FROM Items WHERE id=?';                                                              //
                                                                                                                //
    connection.execute( sql, [ request.query.id ], function( error, result ) {                                  //
        if( error ) {                                                                                           //
            console.log( error );                                                                               //
            return;                                                                                             //
        }                                                                                                       //
        response.sendFile(                                                                                      //
            path.join( __dirname, '..', 'public', 'Page-v1', 'Product_Data_Page.html' )                         //
        );                                                                                                      //
    } );                                                                                                        //
                                                                                                                //
} );                                                                                                            //
                                                                                                                //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                //
router.get( '/itemordered', function( request, response ) {                                                     //
                                                                                                                //
    const sql = 'SELECT id FROM Orders WHERE vertifyCode=?';                                                    //
                                                                                                                //
    connection.execute( sql, [ request.query.code ], function( error, result ) {                                //
        if( error ) {                                                                                           //
            console.log( error );                                                                               //
            return;                                                                                             //
        }                                                                                                       //
        response.sendFile(                                                                                      //
            path.join( __dirname, '..', 'public', 'Page-v1', 'Product_Ordered_Page.html' )                      //
        );                                                                                                      //
    } );                                                                                                        //
                                                                                                                //
} );                                                                                                            //
                                                                                                                //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                //
router.get( '/business', function( request, response ) {                                                        //
                                                                                                                //
    const sql = 'SELECT phonenumber FROM Sellers where id=?';                                                   //
                                                                                                                //
    connection.execute( sql, [ request.query.uid ], function( error, result ) {                                 //
        if( error ) {                                                                                           //
            console.log( error );                                                                               //
            return;                                                                                             //
        }                                                                                                       //
                                                                                                                //
        if( result != undefined && result.length > 0                                                            //
         && hashData( result[ 0 ].phonenumber + '000' ) == request.query.usr_c )                                //
            response.sendFile(                                                                                  //
                path.join( __dirname, '..', 'public', 'Page-v1', 'Business_Page.html' )                         //
            );                                                                                                  //
        else                                                                                                    //
            response.redirect( './access?denied=1');                                                            //
    } );                                                                                                        //
                                                                                                                //
} );                                                                                                            //
                                                                                                                //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                //
router.get( '/business/additem',                                                                                //
    helmet( {                                                                                                   // Set up new policy here to let blob go through
        contentSecurityPolicy: {                                                                                //
            directives: {                                                                                       //
                ...helmet.contentSecurityPolicy.getDefaultDirectives(),                                         //
                "img-src": [ "'self'", "data:", "blob:" ],                                                      //
            }                                                                                                   //
        }                                                                                                       //
    } ),                                                                                                        //
    function( request, response ) {                                                                             //
                                                                                                                //
    const sql = 'SELECT phonenumber FROM Sellers where id=?';                                                   //
                                                                                                                //
    connection.execute( sql, [ request.query.uid ], function( error, result ) {                                 //
        if( error ) {                                                                                           //
            console.log( error );                                                                               //
            return;                                                                                             //
        }                                                                                                       //
                                                                                                                //
        if( result != undefined && result.length > 0                                                            //
         && hashData( result[ 0 ].phonenumber + '000' ) == request.query.usr_c )                                //
            response.sendFile(                                                                                  //
                path.join( __dirname, '..', 'public', 'Page-v1', 'Business_Add_Item_Page.html' )                //
            );                                                                                                  //
        else                                                                                                    //
            response.redirect( './access?denied=1');                                                            //
    } );                                                                                                        //
                                                                                                                //
} );                                                                                                            //
                                                                                                                //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                //
router.get( '/business/item',                                                                                   //
    helmet( {                                                                                                   //
        contentSecurityPolicy: {                                                                                //
            directives: {                                                                                       //
                ...helmet.contentSecurityPolicy.getDefaultDirectives(),                                         //
                "img-src": [ "'self'", "data:", "blob:" ],                                                      //
            }                                                                                                   //
        }                                                                                                       //
    } ),                                                                                                        //
    function( request, response ) {                                                                             //
                                                                                                                //
    const sql = 'SELECT phonenumber FROM Sellers where id=?';                                                   //
                                                                                                                //
    connection.execute( sql, [ request.query.uid ], function( error, result ) {                                 //
        if( error ) {                                                                                           //
            console.log( error );                                                                               //
            return;                                                                                             //
        }                                                                                                       //
                                                                                                                //
        if( result != undefined && result.length > 0                                                            //
         && hashData( result[ 0 ].phonenumber + '000' ) == request.query.usr_c )                                //
            response.sendFile(                                                                                  //
                path.join( __dirname, '..', 'public', 'Page-v1', 'Business_Edit_Item_Page.html' )               //
            );                                                                                                  //
        else                                                                                                    //
            response.redirect( './access?denied=1');                                                            //
    } );                                                                                                        //
                                                                                                                //
} );                                                                                                            //
                                                                                                                //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////




//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                //
router.post( '/preorder', function( request, response ) {                                                       //
                                                                                                                //
    const sql = [                                                                                               //
        'SELECT id FROM Users where phoneNumber=?',                                                             //
        'INSERT INTO Users( phoneNumber ) VALUES ( ? )',                                                        //
        'SELECT vertifyCode FROM Orders',                                                                       //
        'INSERT INTO Orders( itemId, userId, vertifyCode ) VALUES ( ?, ?, ? )'                                  //
    ];                                                                                                          //
                                                                                                                //
    var userid, code = generateAPI();                                                                           //
                                                                                                                //
    connection.execute( sql[ 0 ], [ request.body.phonenumber ], function( error, result ) {                     //
        if( error ) {                                                                                           //
            console.log( error );                                                                               //
            return;                                                                                             //
        }                                                                                                       //
                                                                                                                //
        if( result != undefined && result.length > 0 ) {                                                        //
                                                                                                                //
            userid = result[ 0 ].id;                                                                            //
            connection.execute( sql[ 2 ], function( error, result ) {                                           //
                if( error ) {                                                                                   //
                    console.log( error );                                                                       //
                    return;                                                                                     //
                }                                                                                               //
                                                                                                                //
                if( result != undefined )                                                                       //
                    while( result.filter( e => e.vertifyCode === code ).length > 0 ) code = generateAPI();      //
                                                                                                                //
                connection.execute( sql[ 3 ], [                                                                 //
                    request.query.id,                                                                           //
                    userid,                                                                                     //
                    code                                                                                        //
                ], function( error, result ) {                                                                  //
                    if( error ) {                                                                               //
                        console.log( error );                                                                   //
                        return;                                                                                 //
                    }                                                                                           //
                                                                                                                //
                    response.redirect( '/itemordered?code=' + code );                                           //
                } );                                                                                            //
            } );                                                                                                //
                                                                                                                //
        }                                                                                                       //
        else {                                                                                                  //
                                                                                                                //
            connection.execute( sql[ 1 ], [ request.body.phonenumber ], function( error, result ) {             //
                if( error ) {                                                                                   //
                    console.log( error );                                                                       //
                    return;                                                                                     //
                }                                                                                               //
                userid = result.insertId;                                                                       //
                                                                                                                //
                connection.execute( sql[ 2 ], function( error, result ) {                                       //
                    if( error ) {                                                                               //
                        console.log( error );                                                                   //
                        return;                                                                                 //
                    }                                                                                           //
                                                                                                                //
                    if( result != undefined )                                                                   //
                        while( result.filter( e => e.vertifyCode === code ).length > 0 ) code = generateAPI();  //
                                                                                                                //
                    connection.execute( sql[ 3 ], [                                                             //
                        request.query.id,                                                                       //
                        userid,                                                                                 //
                        code                                                                                    //
                    ], function( error, result ) {                                                              //
                        if( error ) {                                                                           //
                            console.log( error );                                                               //
                            return;                                                                             //
                        }                                                                                       //
                                                                                                                //
                        response.redirect( '/itemordered?code=' + code );                                       //
                    } );                                                                                        //
                } );                                                                                            //
            } );                                                                                                //
                                                                                                                //
        }                                                                                                       //
    } );                                                                                                        //                                       
                                                                                                                //
} );                                                                                                            //
                                                                                                                //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                //
router.post( '/signup', function( request, response ) {                                                         //
                                                                                                                //
    const data = request.body;                                                                                  //
    const sql = [                                                                                               //
        'SELECT id FROM Sellers WHERE phoneNumber=?',                                                           //
        'INSERT INTO Sellers( phoneNumber, companyName, password ) VALUES ( ?, ?, ? )'                          //
    ];                                                                                                          //
                                                                                                                //
    connection.execute( sql[ 0 ], [ data.phonenumber ], function( error, result ) {                             //
        if( error ) {                                                                                           //
            console.log( error );                                                                               //
            return;                                                                                             //
        }                                                                                                       //
                                                                                                                //
        if( result != undefined && result.length > 0 )                                                          //
            response.redirect( '/access?denied=2' );                                                            //
        else {                                                                                                  //
            connection.execute( sql[ 1 ], [                                                                     //
                data.phonenumber,                                                                               //
                data.companyname,                                                                               //
                ( data.password == '' ? hashData( data.phonenumber ) : hashData( data.password ) )              //
            ], function( error, result ) {                                                                      //
                if( error ) {                                                                                   //
                    console.log( error );                                                                       //
                    return;                                                                                     //
                }                                                                                               //
                console.log( result.insertId );                                                                 //
                response.redirect( '/business?usr_c=' + hashData( data.phonenumber + '000' )                    //
                                 + '&uid=' + result.insertId );                                                 //
            } );                                                                                                //
        }                                                                                                       //
    } );                                                                                                        //
                                                                                                                //
} );                                                                                                            //
                                                                                                                //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                //
router.post( '/signin', function( request, response ) {                                                         //
                                                                                                                //
    const data = request.body;                                                                                  //
    const sql = 'SELECT id FROM Sellers WHERE phoneNumber=? and password=?';                                    //
                                                                                                                //
    connection.execute( sql, [                                                                                  //
        data.phonenumber,                                                                                       //
        hashData( data.password )                                                                               //
    ], function( error, result ) {                                                                              //
        if( error ) {                                                                                           //
            console.log( error );                                                                               //
            return;                                                                                             //
        }                                                                                                       //
                                                                                                                //
        if( result != undefined && result.length > 0 ) {                                                        //
            console.log( result );                                                                              //
            response.redirect( '/business?usr_c=' + hashData( data.phonenumber + '000' )                        //
                             + '&uid=' + result[ 0 ].id );                                                      //
        }                                                                                                       //
        else {                                                                                                  //
            console.log( result );                                                                              //
            response.redirect( '/access?denied=1' );                                                            //
        }                                                                                                       //
    } );                                                                                                        //
                                                                                                                //
} );                                                                                                            //
                                                                                                                //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                //
router.post( '/business/adding', upload.single( 'img' ), function( request, response ) {                        //
                                                                                                                //         
    //console.log( request.file );                                                                              //
    //console.log( request.body );                                                                              //
                                                                                                                //
    const image_data = request.file;                                                                            //
    const body_data = request.body;                                                                             //
    const sql = 'INSERT INTO Items( sellerId, itemName, image, quantity, price ) VALUES ( ?, ?, ?, ?, ? )';     //
                                                                                                                //
    connection.execute( sql, [                                                                                  //
        request.query.uid,                                                                                      //
        body_data.itemName,                                                                                     //
        image_data.filename,                                                                                    //
        body_data.quantity,                                                                                     //
        body_data.price                                                                                         //
    ], function( error, result ) {                                                                              //
        if( error ) {                                                                                           //
            console.log( error );                                                                               //
            return;                                                                                             //
        }                                                                                                       //
                                                                                                                //
        response.redirect( '/business?usr_c=' + request.query.usr_c + '&uid=' + request.query.uid );            //
    } );                                                                                                        //
                                                                                                                //
} );                                                                                                            //
                                                                                                                //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                //
router.post( '/business/edited',                                                                                //
    upload.single( 'img' ),                                                                                     //
    function( request, response, next ) {                                                                       //
                                                                                                                //
        if( request.file != undefined ) {                                                                       //
                                                                                                                //
            fs.unlink( './public/Page-v1/' + request.body.image_name, function( err ) {                         //
                                                                                                                //
                if( err && err.code == 'ENOENT' )                                                               //
                    // file doens't exist                                                                       //
                    console.log( 'File ' + request.body.image_name + ' does not exist, cannot remove it.' );    //
                else if ( err )                                                                                 //
                    // other errors, e.g. maybe we don't have enough permission                                 //
                    console.log( 'Error occurred while trying to remove file' );                                //
                else                                                                                            //
                    console.log( 'File ' + request.body.image_name + ' removed' );                              //
                                                                                                                //
            } );                                                                                                //
                                                                                                                //
        }                                                                                                       //
        next( );                                                                                                //
                                                                                                                //
    },                                                                                                          //
    function( request, response ) {                                                                             //
                                                                                                                //         
        //console.log( request.file );                                                                          //
        //console.log( request.body );                                                                          //
                                                                                                                //
        const image_data = request.file;                                                                        //
        const body_data = request.body;                                                                         //
        const sql = 'UPDATE Items '                                                                             //
                  + 'SET' + ( image_data != undefined ? ' image=?,' : '' ) + ' itemName=?, quantity=?, price=? '//
                  + 'WHERE Items.id=?';                                                                         //
                                                                                                                //
        const insertData = ( image_data != undefined ? [                                                        //
            image_data.filename,                                                                                //
            body_data.itemName,                                                                                 //
            body_data.quantity,                                                                                 //
            body_data.price,                                                                                    //
            request.query.iid                                                                                   //
        ] : [                                                                                                   //
            body_data.itemName,                                                                                 //
            body_data.quantity,                                                                                 //
            body_data.price,                                                                                    //
            request.query.iid                                                                                   //
        ] );                                                                                                    //
        //console.log( sql );                                                                                   //
        //console.log( insertData );                                                                            //
                                                                                                                //
        connection.execute( sql, insertData, function( error, result ) {                                        //
            if( error ) {                                                                                       //
                console.log( error );                                                                           //
                return;                                                                                         //
            }                                                                                                   //
                                                                                                                //
            response.redirect( '/business?usr_c=' + request.query.usr_c + '&uid=' + request.query.uid );        //
        } );                                                                                                    //
                                                                                                                //
    
} );                                                                                                            //
                                                                                                                //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

module.exports = router;