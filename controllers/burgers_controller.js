var express = require("express");

var router = express.Router();

// var burger = require("../models/JAVASCRIPT")

router.get("/", function (req, res) {
    burger.all(function (data) {
        var ob = {
            burger: data
        }
        console.log(ob);
        // res.render()
    })
});

router.post("/api/burger", function (req, res) {
    burger.insertOne(["burger_name", "devoured"], (req.body.burger_name, false), function (data) {
        // console.log(data);  
        res.json({
            id: result.insertId
        });
    })
});

router.put("/api/burger/:id", function (req, res) {
    //    console.log(req.params);
    var condition = "id = " + req.params.id;

    burger.updateOne(condition, function (data) {
        if (data.changedRows === 0) {
            return res.status(404).end();
        }
        res.json(data);
        res.status(200).end();
    })
})