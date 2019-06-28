/* eslint-disable func-names */
// Ensure js file is connected
console.log('Connected!');

// Make sure document is loaded
$(document).ready(() => {
  console.log('Document Ready');

  //Create the favorites array
  const favArray = [];

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
  }//End function build buttons

  // Call the Build Buttons Function on page load
  buildButtons();

  // Click event for the buttons, have to use .on instead of .click
  // to have access to future (dynamic) button elements
  $(document).on('click', '.btnTopics', function () {
    console.log('Button Clicked');

    // Clear the div
    $('#planes').empty();

    // Get the value of the button
    // Use the name attribute
    const btnVal = $(this).attr('name');

    // Set the Giphy url based on the button clicked
    const btnURL = `https://api.giphy.com/v1/gifs/search?q=${btnVal}&api_key=2zVk8xHjtG1Sugh6MQgbXltQsEUC8LjD&limit=10&rating=g`;

    // Ajax function to get the images
    $.ajax({
      url: btnURL,
      method: 'GET',
    }).then((response) => {

      console.log(response.data);
      
      // Loop through the returned data
      for (let i = 0; i < response.data.length; i++) {
        // Create a div to hold everything
        const divCont = $('<div>', {
          class: 'divPlanes',
        });

        // Create div to display other meta data
        const messageDiv = $('<div>');
        messageDiv.attr('id', 'messageDiv');
        
        //Set the data to add to this div
        const title = `Title: ${response.data[i].title}<br>`;
        const rating = `Rating: ${response.data[i].rating}<br>`;
        
        // Add Favorite link
        const favorite = $("<a href='#'>Save as Favorite</a><br>");
        favorite.attr('class', 'favorite');

        //Put the title in the display div
        messageDiv.append(title,rating,favorite);

        // Create the image element to hold the returned urls
        //Variables for the urls if the still and animated gifs
        const imgURL = response.data[i].images.fixed_height_still.url;
        const imgAnniURL = response.data[i].images.fixed_height.url;
        //Image element
        const newImage = $('<img>');
        //Data-attributes
        newImage.attr('src', imgURL);
        newImage.attr('data-anniSrc', imgAnniURL);
        newImage.attr('data-stillSrc', imgURL);
        newImage.attr('data-anni', 'false');

        //Add the still image url to the favorite link
        favorite.attr('data-stillUrl', imgURL);

        // Append the message and image to the display div
        divCont.append(messageDiv);
        divCont.append(newImage);

        // Append the content div to the planes div, apply css to make inline
        $('#planes').append(divCont);
      } // End loop over result

      // Function to animate the gif on click
      $('img').click(function () {
        console.log('Image Clicked to Annimate');

        // Check if the gif is the annimated or still version and then switch out the url
        if ($(this).attr('data-anni') === 'false') {
          const newSrc = $(this).attr('data-anniSrc');
          $(this).attr('src', newSrc);
          $(this).attr('data-anni', 'true');
        } else {
          const newSrc = $(this).attr('data-stillSrc');
          $(this).attr('src', newSrc);
          $(this).attr('data-anni', 'false');
        } // End check if annimated or still gif
      }); // End image click

      //Save as Favorite link Clicked
      $(document).on('click', '.favorite', function () {
        //Favorite link clicked
        console.log("Favorite Clicked!");
        
        //Get the still url of the clicked image
        let favURL = $(this).attr('data-stillURL');

        //Push the favID to the favArray
        favArray.push(favURL);
        console.log(favArray);
        
        //Add to the localStorage of favorites
        //Have to Stringify it first because localStorage only holds strings
        localStorage.setItem("favURL", JSON.stringify(favArray));      
      });


    }); // End Ajax Get
  }); // End Click on Topics Buttons

  // Function to add the user entered Plane
  $('#btnAdd').click(() => {
    console.log('Add Plane Button Clicked');
    
    //Variable to hold the value
    const newPlane = $('#addPlane').val();
  
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
  }); // End Add User Entered Plane

  // Function to show favorites
  $('#btnFav').click(() => {
    console.log('Favorites button clicked!');

    //Get the array of favorites
    //Have to Parse it back into an array
    let favs = JSON.parse(localStorage.getItem("favURL"));
    console.log(favs);

    if (favs.length === 0){
      //Show message that there are no favorites
      $("#delInst").html("There are No Favorites to Display");
    }else{
      $("#delInst").html("Click the Image to Delete");
    }

    //Clear fav div first
    $("#favDiv").empty();

    for (let i = 0; i < favs.length; i++){
      console.log(favs[i]);

      //Create the img elements with the still url
      const newFav = $('<img>');
      
      //Add the src
      newFav.attr('src', favs[i]);

      //Add a class
      newFav.attr('class', 'favImage');

      //Append to the favorites div
      $("#favDiv").append(newFav);
      
    }//End loop through favorites

    //Function to Remove a favorite
    $(document).on('click', '.favImage', function () {
      console.log("Favorite Image Clicked!");

      //Get the URL of the clicked image
      let favImageClicked = $(this).attr('src');
      console.log(favImageClicked);
      console.log(favs);
      
      //Get the index of this image in the favArray
      let indexFav = favs.indexOf(favImageClicked);
      console.log(indexFav);

      console.log(typeof indexFav);

      //Remove that image from the favorites array
      favs.splice(indexFav, 1);   

      console.log(favs);

      //Update local storage
      localStorage.setItem("favURL", JSON.stringify(favs));
      
      //Refresh the favDiv
      
    });


  });//End Show Favorites button clicked


}); // End document ready
