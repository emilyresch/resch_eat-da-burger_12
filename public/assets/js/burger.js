//make sure everything loads
$(function () {
    //on-click event for adding burger button
    $(".create.form").on("submit", function (e) {
        e.preventDefault();

        var newBurger = {
            burger_name: $("#burg").val().trim(),
            devoured: 0
        };

        console.log(newBurger);

        $.ajax("/api/burgers", {
            type: "POST",
            data: newBurger
        }).then(function () {
            console.log("New burger added!");
            //reload page automatically
            location.reload();
        });
    });

    //on-click event for devour button
    $(".devour-btn").on("click", function (e) {
        e.preventDefault();
        var id = $(this).data("id");
        //set devoured to true/1
        var devState = {
            devoured: dev
        }

        // console.log(devState);

        $.ajax("/api/burgers/" + id, {
            type: "PUT",
            data: devState
        }).then(function () {
            console.log("That was yummy!");
            location.reload();
        })
    });


});