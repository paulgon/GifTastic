$(document).ready(function () {

    var bands = ['pearl jam', 'dave matthews band', 'led zeppelin'];


    function buttonCreation() {
        $('#buttons-place').empty();

        for (var i = 0; i < bands.length; i++) {
            var button = $('<button>');
            button.addClass('btn');
            button.text(bands[i]);
            button.attr('data-btn', bands[i]);
            $('#buttons-place').append(button);
        }
    }
    // buttonCreation();

    // $('#new').addClass('newBtn') 

    $('#myform').on('submit', function (event) {
        event.preventDefault();
        var inputVal = $('#myInput')
            .val()
            .trim();
        bands.push(inputVal);
        buttonCreation();
    });

    buttonCreation();

    
    $(document).on('click', '.btn', function () {
        $(".btn").removeClass("active");
        $(this).addClass("active");

        var band = $(this).attr('data-btn');
        console.log(band);
        var url =
            'https://api.giphy.com/v1/gifs/search?q=' +
            band +
            '&api_key=dc6zaTOxFJmzC&limit=10';

        $.ajax({
            url: url,
            method: 'GET'
        }).then(function (response) {
            var results = response.data;
            console.log(results);


            for (var i = 0; i < 10; i++) {
                var bandPlace = $("#gif-place");

                var rating = results[i].rating;

                var p = $("<p>").text("Rating: " + rating);

                var animated = results[i].images.fixed_height.url;
                var still = results[i].images.fixed_height_still.url;

                var bandImg = $("<img>");
                bandImg.attr("src", still);
                bandImg.attr("data-still", still);
                bandImg.attr("data-animate", animated);
                bandImg.attr("data-state", "still");
                bandImg.addClass("band-image");

                bandPlace.append(p);
                bandPlace.append(bandImg);

                $("#gif-place").append(bandImg);
            }
        });
    });



    $(document).on("click", ".band-image", function () {

        var state = $(this).attr("data-state");

        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        }
        else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });



});


