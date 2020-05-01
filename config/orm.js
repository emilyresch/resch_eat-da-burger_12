var connection = require("./connection");

var tableName = "burgers";

function objToSql(ob) {
    var arr = [];
  
    // loop through the keys and push the key/value as a string int arr
    for (var key in ob) {
      var value = ob[key];
      // check to skip hidden properties
      if (Object.hasOwnProperty.call(ob, key)) {
        // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
        if (typeof value === "string" && value.indexOf(" ") >= 0) {
          value = "'" + value + "'";
        }
        arr.push(key + "=" + value);
      }
    }
    // translate array of strings to a single comma-separated string
    return arr.toString();
  }

var orm = {
        selectAll: function (cb) {
            var queryString = "SELECT * FROM " + tableName;

            connection.query(queryString, function (err, data) {
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

                connection.query(queryString, vals, function(err, result) {
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
                queryString += condition;  //UPDATE burgers SET devoured = true WHERE id = 2;
                // "= true WHERE id = ?";
                console.log(queryString);
                connection.query(queryString, function(err, result) {
                  if (err) {
                    throw err;
                  }
            
                  cb(result);
                });
            }

}
//export for the model - burger.js
module.exports = orm;