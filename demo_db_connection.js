var mysql = require('mysql');

var con = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "",
  port: "3306"
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