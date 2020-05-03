var connection = require("../config/connection.js");

//helpers
//this makes column names into sql readable format. turns everything into string
function transSql(ob) {
  var arr = [];
  for (var key in ob) {
    var value = ob[key];
    if (Object.hasOwnProperty.call(ob, key)) {
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }
      arr.push(key + "=" + value);
    }
  }
  return arr.toString();
}

//prints questionmarks based on number of values to input
function makeQmarks(num) {
  var arr = [];
  for (let i = 0; i < num; i++) {
    arr.push("?")
  }
  return arr.toString();
}



//logic of the application. houses all queries 
var orm = {
  selectAll: function(tableName, cb) {
    var queryString = "SELECT * FROM " + tableName + ";";

    // console.log(queryString);
    connection.query(queryString, function (err, data) {
      if (err) throw err;
      cb(data);
    });

  },
  insertOne: function(tableName, cols, vals, cb) {
    //INSERT INTO burgers(burger_name, devoured) VALUES("Impossible Burger", false),
    var queryString = "INSERT INTO " + tableName;

    queryString += " (";
    queryString += cols.toString();
    queryString += ") ";
    queryString += "VALUES (";
    queryString += makeQmarks(vals.length);
    queryString += ") ";

    // + "(burger_name) VALUES (?)";
    console.log(queryString);

    connection.query(queryString, vals, function (err, result) {
      if (err) throw err;
      cb(result);
    });
    // connection.query(queryString, [burger.burger_name], function (err, data) {
    //     cb(data);
    // });
  },


  updateOne: function(tableName, objColVals, condition, cb) {

    var queryString = "UPDATE " + tableName;
    queryString += " SET ";
    queryString += transSql(objColVals);
    queryString += " WHERE ";
    queryString += condition; //UPDATE burgers SET devoured = true WHERE id = 2;
    // "= true WHERE id = ?";
    console.log(queryString);
    connection.query(queryString, function (err, data) {
      if (err) throw err;
      cb(data);
    });
  }

}
//export for the model - burger.js
module.exports = orm;