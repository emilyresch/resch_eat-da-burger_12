$(function () {
    //on-click event for devour button
    $(".devour-btn").on("click", function (e) {
        var id = $(this).data("id");
        var newdevstatus = $(this).data("dev");

        var devBurger = {
            devoured: newdevstatus
        }

        console.log(devBurger);

        $.ajax("/api/burger/" + id, {
            type: "PUT",
            data: devBurger
        }).then(function () {
            console.log("Burger is ", newdevstatus);
            location.reload();
        }
        )
    });


        //on-click event for adding burger button
        $(".create.form").on("submit", function (e) {
            e.preventDefault();

            var newBurger = {
                burger_name: $("#burg").val().trim(),
                devoured: false
            };

            console.log(newBurger);

            $.ajax("/api/burger", {
                type: "POST",
                data: newBurger
            }).then(function () {
                console.log("New burger added!");
                location.reload();
            }
            );
        });
    });
