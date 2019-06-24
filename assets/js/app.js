/* eslint-disable func-names */
// Ensure js file is connected
console.log('Connected!');

// Make sure document is loaded
$(document).ready(() => {
  console.log('Document Ready');

  // Build the array of airplanes
  const Airplanes = [
    'P-51 Mustang',
    'P-47 Thunderbolt',
    'P-38 Lightning',
    'Supermarine Spitfire',
    'F4U Corsair',
    'B-29 Superfortress',
    'B-25 Mitchell',
    'B-24 Liberator',
    'B-26 Marauder',
    'A-26 Invader',
  ];

  // Loop over the array and build the buttons and display
  Airplanes.forEach((element) => {
    // let newBtn = $('<button>'+element+'<button />');
    const newBtn = $('<button/>', {
      type: 'button',
      text: element,
      id: 'btn_refresh',
      class: 'btn btn-primary',
    });
    $('#buttons').append(newBtn);
  });

  // Click event for the buttons
  $('.btn').click(function () {
    console.log('Button Clicked');

    // Clear the div
    $('#planes').empty();

    // Get the value of the button
    const btnVal = $(this).text();
    console.log(btnVal);

    $.ajax({
      url: `http://api.giphy.com/v1/gifs/search?q=${btnVal}&api_key=2zVk8xHjtG1Sugh6MQgbXltQsEUC8LjD&limit=10&rating=g`,
      method: 'GET',
    }).then((response) => {
      console.log(response.data);
      // console.log(response.data.embed_url);

      // let imgURL = "http://api.giphy.com/gifs/gifnews-wwii-13psSo4CGyjosg"

      response.data.forEach((element) => {
        console.log(element.embed_url);

        const imgURL = element.images.fixed_height_still.url;

        const newImage = $('<img>', {
          src: imgURL,
        });

        $('#planes').append(newImage);

        // let newImage ="<img src='https://giphy.com/gifs/erika-wish-jvngsica-xCGnOu4VH3uta'>"
        // $("#planes").append(newImage);

        // var newImage = $('<img />', {
        //   id: 'Myid',
        //   src: element.url,
        //   alt: 'MyAlt'
        // });
        // newImage.appendTo($('#planes'));
      });
    }); // End Ajax Get
  });
}); // End document ready
