var connection = require("./connection");

// var tableName = "burgers";

var orm = {
  selectAll: function (tableName, cb) {
    var queryString = "SELECT * FROM " + tableName + ";";

    connection.query(queryString, function (err, data) {
      if (err) throw err;
      cb(data);
    });

  },
  insertOne: function (tableName, cols, vals, cb) {
    //INSERT INTO burgers(burger_name, devoured) VALUES("Impossible Burger", false),
    var queryString = "INSERT INTO " + tableName;

    queryString += " (";
    queryString += cols.toString();
    queryString += ") ";
    queryString += "VALUES (?, ?)";
    // + "(burger_name) VALUES (?)";
    console.log(queryString);

    connection.query(queryString, vals, function (err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
    // connection.query(queryString, [burger.burger_name], function (err, data) {
    //     cb(data);
    // });
  },


  updateOne: function (tableName, condition, cb) {

    var queryString = "UPDATE " + tableName;
    queryString += " SET ";
    queryString += "devoured = true";
    queryString += " WHERE ";
    queryString += condition; //UPDATE burgers SET devoured = true WHERE id = 2;
    // "= true WHERE id = ?";
    console.log(queryString);
    connection.query(queryString, function (err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  }

}
//export for the model - burger.js
module.exports = orm;