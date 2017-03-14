//"use strict";

var aryWrong = [];
var arySkipped=[];

/*
 * document ready
 */
$(document).ready(function() {

  /*
   * Hamburger Menu
   */
  $("#hamburger-menu").hide();
  $("#hamburger").click(function() {
    $("#hamburger-menu").slideToggle();
  });

  /*
   * toggle audio
   */
  $("#toggle-audio").click(function() {
    if ($(this).text() == "Audio: Off") {
      $(this).text("Audio: On");
    }
    else {
      $(this).text("Audio: Off");
    }
    $("#hamburger").click();
  });

  initialize();

});

/*
 * onStateNameClick function
 */
function onStateNameClick() {
  console.log('-- Skipped: ' + $(".cur-state").text());

  arySkipped.push($(".cur-state").text());

  $(".cur-state").off("click")
                 .hide("fast")
                 .removeClass("cur-state")
                 .detach()
                 .appendTo("#states");

  $(".state").not(".used-state")
             .filter(":first")
             .addClass("cur-state")
             .click(onStateNameClick)
             .show("fast");
} 


/* 
 * onStateClick function 
 */
function onStateClick(event, data) {
  if ($("#map").queue().length > 0) {
    console.log("Clicked, but map is still animating...");
    return;
  }
  console.log("Clicked: " + data.name + " -- Current state: " + statesAndCaps.getAbbv($(".cur-state").text()));
  // First let"s see if this is a state on the current list
  // and whether it has already be "used"
  if (statesAndCaps.allStates.indexOf(data.fullName) >=0  && 
      $("#"+data.name).data("used") != "1") {

    $(".cur-state").hide().off("click");

    // right
    if (data.name == $(".cur-state").data("abbv")) {

      console.log("-- right!");
      $(".cur-state").addClass("used-state");
      $("#"+data.name).data("used","1");
      var style = {};
      style[data.name] = { fill: "#098e10" };
      //$("#map").usmap("stateSpecificHoverStyles", style);
      $("#map").usmap("stateSpecificStyles", style);
      if ($("#toggle-audio").text() == "Audio: On") {
        $("#fantastic")[0].play();
      }

    }
    // wrong
    else {

      console.log("-- wrong!");
      var style = {};
      style[data.name] = { fill: "#49b7b2" };
      //$("#map").usmap("stateSpecificHoverStyles", style);
      //aryWrong.push($(".cur-state").text() + "," + data.name); // displayed state, state clicked
      aryWrong.push($(".cur-state").text());
      $("#map").effect("shake");
      if ($("#toggle-audio").text() == "Audio: On") {
        $("#wrong")[0].play();
      }

    }

    // Move this state to the end of the list
    $(".cur-state").removeClass("cur-state").detach().appendTo("#states");

    /*
     * check for winner
     */
    if ($(".used-state").length == $(".state").length) {
      //alert("you are done!");
      finalResults();
    }
    else {
      $(".state").not(".used-state").filter(":first").addClass("cur-state").show().click(onStateNameClick);
    }
  }
}

/*
 * initialize the game
 */
function initialize() {

  aryWrong=[];
  arySkipped=[];

  $("#results").hide();

  /* 
   * try to make the map scale to the screen
   */
  var w = $(window).width();
  if (w > 900) {
    $(".map-container").width('100%');
    $(".map-container").height(w);
    $("#map").width('90%');
    $("#map").height(w);
  }

  /* 
   * create a <div> for each state, and
   * add some color to the current states to be tested
   */
  var stateSpStyles = {};
  for (var i=0, a=statesAndCaps.allStates.sort(randomSort2).sort(randomSort2); i<a.length; i++) {
    $("#states").append('<div class="state" data-abbv="' + statesAndCaps.getAbbv(a[i]) + '">' + a[i] + '</div>');
    stateSpStyles[statesAndCaps.getAbbv(a[i])] = { fill: '#49b7b2' };
  }

  $(".state").hide().filter(":first").addClass("cur-state").click(onStateNameClick).show();

  $('#map').usmap({
    stateSpecificStyles: stateSpStyles,
    //stateHoverStyles: null,//{fill: "#f2354b"},
    showLabels: false
  });
  
  $('#map').on('usmapclick', onStateClick); 
  $("#btnTryAgain").click(function() {
    location.reload();
  });

  $(".container").not("#results").fadeIn();
  $(".map-container").fadeIn();
}

/*
 * Final Results
 */
function finalResults() {

  var res = {};

  for (var i=0; i<aryWrong.length; i++) {
    var c = aryWrong[i].split(", ")[0];
    if (!res.hasOwnProperty(c)) {
      res[c] = {wrong: 0, skipped: 0};
    }
    res[c].wrong++;
  }

  for (var i=0; i<arySkipped.length; i++) {
    var c = arySkipped[i];
    if (!res.hasOwnProperty(c)) {
      res[c] = {wrong: 0, skipped: 0};
    }
    res[c].skipped++;
  }

  var sorted_res = Object.keys(res).sort();

  if (sorted_res.length <= 0) {
    $("#results-table").hide();
    $("#perfect-score").show();
  }
  else {
    $(".result-row").remove();
    $("#results-table").show();
    $("#perfect-score").hide();

    for (var i=0; i<sorted_res.length; i++) {
      var c = sorted_res[i];
      $("<tr class='result-row'><td>" + c + "</td><td>" + res[c].wrong + "</td><td>" 
           + res[c].skipped + "</td></tr>").insertAfter($("#results-table tr:last"));
    }

  }

  $(".container").hide();
  $(".map-container").hide();
  $("#results").fadeIn();
  
}
