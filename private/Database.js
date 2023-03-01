const mysql = require( 'mysql2' );                      // Cannot use mysql since it doesn't use 'mysql_native_password'
                                                        // Instead it uses 'caching_sha2_password'

var connection = mysql.createPool({                     // Create a cache to remember users so that users can reconnect easily
    host                  : "localhost",                // Host
    user                  : "test_user",                // Username of database
    password              : "_Test123_",                // Password for username
    database              : "dbTest",                   // Database you want to access, if not you can change to other database
    waitForConnections    : true,                       // If max amount is reached, if let people wait for a slot, true, else false and return error page
    connectionLimit       : 99,                         // Max amount of users allowed accessing the database
    queueLimit            : 0                           // Limit on how many requests database can take, 0 for unlimited
});

module.exports = connection;