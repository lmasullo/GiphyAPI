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

  //Function to build the buttons from the topics array
  function buildButtons() {
    // 1st clear the div
    $('#buttons').empty();
    // Loop over the array and build the buttons and display
    topics.forEach((element) => {
      let newBtn = $('<button/>', {
        type: 'button',
        text: element,
        class: 'btn btn-primary btnTopics',
      });
      //Append the buttons to the buttons div on the index.html page
      $('#buttons').append(newBtn);
    });
    console.log(topics);
  }

  // Call the Build Buttons Function on page load
  buildButtons();

  // Click event for the buttons, have to use .on instead if .click to have access to future button elements
  $(document).on('click tap touchstart','.btnTopics',function(){
    console.log('Button Clicked');

    // Clear the div
    $('#planes').empty();
    // $('.spanplanes').empty();

    // Get the value of the button
    const btnVal = $(this).text();
    console.log(btnVal);

    //Set the Giphy url based on the button clicked
    const btnURL = `http://api.giphy.com/v1/gifs/search?q=${btnVal}&api_key=2zVk8xHjtG1Sugh6MQgbXltQsEUC8LjD&limit=10&rating=g`;

    //Ajax function to get the images
    $.ajax({
      url: btnURL,
      method: 'GET',
    }).then((response) => {
      console.log(response.data[0].images);

      // Loop through the returned data
      for (let i = 0; i < response.data.length; i++) {
 
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

      //Function to animate the gif on click
      $('img').click(function () {
        //Check if the gif is the annimated or still version and then switch out the url
        if ($(this).attr('anni') === 'false') {
          const newSrc = $(this).attr('anniSrc');
          $(this).attr('src', newSrc);
          $(this).attr('anni', 'true');
        } else {
          const newSrc = $(this).attr('stillSrc');
          $(this).attr('src', newSrc);
          $(this).attr('anni', 'false');
        }//End check if annimated or still gif
      }); // End image click
    }); // End Ajax Get
  });// End Click on Topics Buttons

  //Function to add the user entered button
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
