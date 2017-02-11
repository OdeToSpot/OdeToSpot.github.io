$(document).ready(function() {

  // hide the little boxes that show up with the abbreviation for the smaller states like Rhode Island
  $('#map').usmap({showLabels: false});

  $('#map').on('usmapclick', onStateClick); 

  initialize();

});


/* onStateClick function */
function onStateClick(event, data) {
  if (objStateAbbrev[data.name] == $('.state').text()) {
    alert("Yeah");
  }
  else {
    alert("You picked " + data.name + " but should have picked " + $('.state').text());
  }
}

function initialize() {
  $('.state').text("Pennsylvania");

  
}
