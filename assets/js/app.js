/* eslint-disable func-names */
// Ensure js file is connected
console.log('Connected!');

// Make sure document is loaded
$(document).ready(() => {
  console.log('Document Ready');

  // Build the array of topics
  const topics = [
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

  let newBtn = '';

  function buildButtons() {
    // 1st clear the div
    $('#buttons').empty();
    // Loop over the array and build the buttons and display
    topics.forEach((element) => {
      // let newBtn = $('<button>'+element+'<button />');
      newBtn = $('<button/>', {
        type: 'button',
        text: element,
        id: 'btn_refresh',
        class: 'btn btn-primary btnTopics',
      });
      $('#buttons').append(newBtn);
    });
    console.log(topics);

    $('.btnTopics').click(() => {
      console.log('2nd button clicks');
    });
  }

  // Call the Build Buttons Function
  buildButtons();

  // Click event for the buttons
  $('.btnTopics').click(function () {
    console.log('Button Clicked');

    // Clear the div
    $('#planes').empty();
    // $('.spanplanes').empty();

    // Get the value of the button
    const btnVal = $(this).text();
    console.log(btnVal);

    const btnURL = `http://api.giphy.com/v1/gifs/search?q=${btnVal}&api_key=2zVk8xHjtG1Sugh6MQgbXltQsEUC8LjD&limit=10&rating=g`;
    // const btnURL = 'http://api.giphy.com/v1/gifs/search?q=husky&api_key=2zVk8xHjtG1Sugh6MQgbXltQsEUC8LjD&limit=10&rating=g';

    $.ajax({
      url: btnURL,
      method: 'GET',
    }).then((response) => {
      console.log(response.data[0].images);

      // Loop through the returned data
      for (let i = 0; i < response.data.length; i++) {
        // response.data.forEach((element) => {
        // console.log(element.embed_url);

        // Create an inline span to hold everything
        const spanCont = $('<div>', {
          class: 'spanPlanes',
        });

        // Create div to display other meta datas
        const rating = `Rating: ${response.data[i].rating}`;
        const title = `<br>Title: ${response.data[i].title}`;
        const messageDiv = $('<div>', {
          text: rating,
        });
        messageDiv.append(title);
        // console.log(messageDiv);

        // Create the image element to hold the returned urls
        const imgURL = response.data[i].images.fixed_height_still.url;
        const imgAnniURL = response.data[i].images.fixed_height.url;
        const newImage = $('<img>', {
          src: imgURL,
          anniSrc: imgAnniURL,
          stillSrc: imgURL,
          anni: 'false',
        });

        // Append the message and image to the div
        spanCont.append(messageDiv);
        spanCont.append(newImage);

        // Append the content div to the planes div, apply css to make inline
        $('#planes').append(spanCont);
      } // End loop over result

      $('img').click(function (e) {
        // e.preventDefault(); // prevent default behavior of <a>
        if ($(this).attr('anni') === 'false') {
          const newSrc = $(this).attr('anniSrc');
          $(this).attr('src', newSrc);
          $(this).attr('anni', 'true');
        } else {
          const newSrc = $(this).attr('stillSrc');
          $(this).attr('src', newSrc);
          $(this).attr('anni', 'false');
        }
        // const anniSrc = $(this).attr('anniSrc');
        // console.log(anniSrc);
        // $(this).attr('src', anniSrc);
      }); // End image click
    }); // End Ajax Get
  }); // End Click on Topics Buttons

  $('#btnAdd').click(() => {
    console.log('Add Plane Button Clicked');
    const newPlane = $('#addPlane').val();
    console.log(newPlane);
    topics.push(newPlane);
    console.log(topics);

    // Call the Build Buttons Function
    buildButtons();
  });
}); // End document ready
