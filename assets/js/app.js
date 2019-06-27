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

  // Function to build the buttons from the topics array
  function buildButtons() {
    // 1st clear the div
    $('#buttons').empty();
    // Loop over the array and build the buttons and display
    topics.forEach((element) => {
      const newBtn = $('<button/>', {
        type: 'button',
        text: element,
        class: 'btn btn-primary btnTopics',
        name: element,
      });
      // Append the buttons to the buttons div on the index.html page
      $('#buttons').append(newBtn);
    });
    // console.log(topics);
  }

  // Call the Build Buttons Function on page load
  buildButtons();

  // Click event for the buttons, have to use .on instead of .click
  // to have access to future button elements
  $(document).on('click', '.btnTopics', function () {
    console.log('Button Clicked');

    // Clear the div
    $('#planes').empty();

    // Get the value of the button
    //const btnVal = $(this).text();
    //Use the name attribute
    const btnVal = $(this).attr("name");
    // console.log(btnVal);

    // Set the Giphy url based on the button clicked
    const btnURL = `https://api.giphy.com/v1/gifs/search?q=${btnVal}&api_key=2zVk8xHjtG1Sugh6MQgbXltQsEUC8LjD&limit=10&rating=g`;

    // Ajax function to get the images
    $.ajax({
      url: btnURL,
      method: 'GET',
    }).then((response) => {
      // console.log(response.data[0].images);

      // Loop through the returned data
      for (let i = 0; i < response.data.length; i++) {
        // Create a div to hold everything
        const divCont = $('<div>', {
          class: 'spanPlanes',
        });

        // Create div to display other meta datas
        const rating = `Rating: ${response.data[i].rating}`;
        const title = `<br>Title: ${response.data[i].title}`;
        const messageDiv = $('<div>', {
          text: rating,
        });
        
        //Add Favorited checkbox and save to local storage
        // conts favorite = 
        
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
        divCont.append(messageDiv);
        divCont.append(newImage);

        // Append the content div to the planes div, apply css to make inline
        $('#planes').append(divCont);
      } // End loop over result

      // Function to animate the gif on click
      $('img').click(function () {
        console.log('Image Clicked to Annimate');

        // Check if the gif is the annimated or still version and then switch out the url
        if ($(this).attr('anni') === 'false') {
          const newSrc = $(this).attr('anniSrc');
          $(this).attr('src', newSrc);
          $(this).attr('anni', 'true');
        } else {
          const newSrc = $(this).attr('stillSrc');
          $(this).attr('src', newSrc);
          $(this).attr('anni', 'false');
        } // End check if annimated or still gif
      }); // End image click
    }); // End Ajax Get
  }); // End Click on Topics Buttons

  // Function to add the user entered Plane
  $('#btnAdd').click(() => {
    console.log('Add Plane Button Clicked');
    const newPlane = $('#addPlane').val();
    // console.log(newPlane);

    if (newPlane != '') {
      // Clear the validate message
      $('#validate').empty();

      // Push the new plane to the topics array
      topics.push(newPlane);

      // Clear the add plane field
      $('#addPlane').val('');

      // Call the Build Buttons Function
      buildButtons();
    } else {
      // Nothing entered, tell user
      console.log('Field Empty');
      $('#validate').html("Please enter a plane's name.");
    }
  });//End Add User Entered Plane
}); // End document ready
