$(document).ready(function() {

  $('#map').on('usmapclick', onStateClick); 

var x='MD';
  $('#map').usmap({
    stateSpecificStyles: {
      'PA': {fill: 'yellow'},
      'VA': {fill: 'orange'}
    },
    showLabels: false
    
  });

  initialize();

});


/* onStateClick function */
function onStateClick(event, data) {
  if (data.fullName == $('.state').text()) {
    alert("Yeah");
  }
  else {
    alert("You picked " + data.fullName + " but should have picked " + $('.state').text());
  }
  var style = {};
  style["PA"] = { fill: 'purple' };
  $('#map').usmap('stateSpecificStyles',style);
/*
  $('#PA').css("fill", 'orange');
  $('#map').usmap({
    stateSpecificStyles: {
      'PA': {fill: 'orange'},
    }
  }); */
}

function initialize() {
  $('.state').text("Pennsylvania");

  
}
