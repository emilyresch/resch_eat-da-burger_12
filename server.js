var express = require('express');
// var bodyParser = require("body-parser");
var PORT = process.env.PORT || 8090;

var app = express();

//serve frontend css/js
app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//handlebars
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


//use routes from controller
var routes = require("./controllers/burgers_controller.js");

app.use(routes);

//listen
app.listen(PORT, function() { console.log("http://localhost:" + PORT); });