// Requiring mysql package
var mysql = require("mysql");

// Setting up our connection information
// var source = {
//   localhost: {
//     host: "localhost",
//     port: 3306,
//     user: "root",
//     password: "rootroot",
//     database: "burgers_db"
//   }
// };
var connection;

if(process.env.JAWSDB_URL){
  connection = mysql.createConnection(process.env.JAWSDB_URL);
}else{
  connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "rootroot",
    database: "burgers_db"
  })
}


// Creating connection
// var connection = mysql.createConnection(source.localhost);


// Connecting to database.
connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

// Exporting our connection
module.exports = connection;