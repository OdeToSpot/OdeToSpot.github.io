var aryWrong = [];
$(document).ready(function() {
  initialize();
});


/* 
 * onStateClick function 
 */
function onStateClick(event, data) {
  if ($("#map").queue().length > 0) {
    console.log('Clicked, but map is still animating...');
    return;
  }
  console.log('Clicked: ' + data.name + ' -- Current state: ' + statesAndCaps.getAbbv($('.cur-state').text()));
  // First let's see if this is a state on the current list
  if (statesAndCaps.allStates.indexOf(data.fullName) >=0) {
    if (data.name == $('.cur-state').data('abbv')) {
      var style = {};
      style[data.name] = { fill: '#098e10' };
      $('#map').usmap('stateSpecificStyles', style);
    }
    else {
      console.log("-- wrong!");
      aryWrong.push($('.cur-state').text() + ", " + data.fullName); // displayed state, state clicked
      $("#map").effect("shake");
    }

    $('.cur-state').removeClass('cur-state').addClass('used-state').hide();
    /*
     * check for winner
     */
    if ($('.used-state').length == $('.state').length) {
      alert("you are done!");
    }
    else {
      $('.state').not('.used-state').filter(':first').addClass('cur-state').show();
    }
  }
}

/*
 * initialize the game
 */
function initialize() {

  aryWrong=[];

  /* 
   * create a <div> for each state, and
   * add some color to the current states to be tested
   */
  var stateSpStyles = {};
  for (var i=0, a=statesAndCaps.allStates.sort(randomSort2).sort(randomSort2); i<a.length; i++) {
    $("#states").append('<div class="state" data-abbv="' + statesAndCaps.getAbbv(a[i]) + '">' + a[i] + '</div>');
    stateSpStyles[statesAndCaps.getAbbv(a[i])] = { fill: '#49b7b2' };
  }

  $(".state").hide().filter(":first").addClass("cur-state").show();

  $('#map').usmap({
    stateSpecificStyles: stateSpStyles,
    stateHoverStyles: null,
    showLabels: false
  });
  
  $('#map').on('usmapclick', onStateClick); 
  
}
