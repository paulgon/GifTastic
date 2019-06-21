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
buttonCreation();

$('#myform').on('submit', function (event) {
    event.preventDefault();
    var inputVal = $('#myInput')
        .val()
        .trim();
    bands.push(inputVal);
    buttonCreation();
});

$('.btn').on('click', function () {
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
        console.log(response);
    });
});

//functions anonymus functions  // callback
