/* eslint-disable func-names */
// Ensure js file is connected
console.log('Connected!');

// Make sure document is loaded
$(document).ready(() => {
  console.log('Document Ready');
  
  //Build the array of airplanes
  const Airplanes = ['P-51 Mustang', 'P-47 Thunderbolt', 'P-38 Lightning', 'Supermarine Spitfire', 'F4U Corsair', 'B-29 Superfortress', 'B-25 Mitchell', 'B-24 Liberator', 'B-26 Marauder', 'A-26 Invader' ];
  
  //Loop over the array and build the buttons and display
  Airplanes.forEach(function(element){
    //let newBtn = $('<button>'+element+'<button />');
    let newBtn = $('<button/>', {
      type: 'button',
      text: element,
      id: 'btn_refresh',
      class: 'btn btn-primary'
    });
    $("#buttons").append(newBtn);
  });

  //Click event for the buttons
  $(".btn").click(function(){
    console.log('Button Clicked');
    
    //Get the value of the button
    const btnVal = $(this).text();
    console.log(btnVal);
  });

  

  
  
  
}); // End document ready
