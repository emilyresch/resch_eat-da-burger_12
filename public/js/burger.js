var orm = require("../../config/orm.js");

$(function () {
    //on-click event for devour button
    $(".devour-btn").on("click", function (e) {
        var id = $(this).data("id");
        var devstatus = $(this).data("dev");

        var devBurger = {
            devoured: devstatus
        }

        $.ajax("/api/burger" + id, {
            type: "PUT",
            data: devBurger
        }).then(function () {
            console.log("Burger is ", devstatus);
            location.reload();
        })
    })

    //on-click event for adding burger button
    $(".create.form").on("click", function (e) {
        e.preventDefault();

        var newBurger = {
            burger_name: $("#burg").val().trim(),
            devoured: false
        };

        $.ajax("/api/burger", {
            type: "POST",
            data: newBurger
        }).then(function () {
            console.log("New burger created!")
            location.reload();
        })
    });
});