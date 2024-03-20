
// Right now I have a database which is dbTest
// This database now contains 5 tables Items, Orders, Sellers, Users and account

//// Items table has 7 columns ( id, sellerId, itemName, image, quantity, price, time )

//// Orders table has 5 columns ( id, itemId, userId, vertifyCode, time )

//// Sellers table has 4 colummns ( id, phoneNumber, company, password )

//// Users table has 2 columns ( id, phoneNumber )

//// Inside that table I have columns { "PersonID", "LastName", "FirstName", "Address", "City"}

const mysql = require( 'mysql2' );                      // Cannot use mysql since it doesn't use 'mysql_native_password'
                                                        // Instead it uses 'caching_sha2_password'

var connection = mysql.createPool({                     // Create a cache to remember users so that users can reconnect easily
    host                  : "127.0.0.1",                // Host
    user                  : "test_user",                // Username of database
    password              : "_Test123_",                // Password for username
    database              : "dbTest",                   // Database you want to access, if not you can change to other database
    //debug                 : true,                     // If you want to debug the connection query sent by mysql, uncomment this line
    waitForConnections    : true,                       // If max amount is reached, if let people wait for a slot, true, else false and return error page
    connectionLimit       : 99,                         // Max amount of users allowed accessing the database
    queueLimit            : 50                          // Limit on how many requests database can take, 0 for unlimited
});

module.exports = connection;