var express = require("express");
var burger = require("../models/burger.js")
var router = express.Router();
//build router connections and identify endpoints
router.get("/", function (req, res) {
    burger.selectAll(function (data) {

        //object to send to handlebars
        var ob = {
            burger: data
        }
        // console.log(ob);
        res.render("index", ob);
    })
});

router.post("/api/burger", function (req, res) {
    burger.insertOne(["burger_name", "devoured"], (req.body.burger_name, req.body.devoured), function (data) {
        console.log(data);
        res.json({
            id: result.insertId
        });
    })
});


//route to "devour" the burger on click
router.put("/api/burger/:id", function (req, res) {
    //    console.log(req.params);
    var condition = "id = " + req.params.id;

    console.log(condition);

    burger.updateOne({
            devoured: req.body.devoured
        },
        condition,
        function (data) {
            if (data.changedRows === 0) {
                return res.status(404).end();
            }
            // res.json(data);
            res.status(200).end();
        })
});

module.exports = router;