// jQuery
  $(document).ready(function() {

    // Create the "#capitals" table.  Expects <table id="capitals> in the HTML
    createCapsDiv(valToArray(objStatesAndCaps).sort(randomSort2));
    
    // Create the "#states" table.  Expects <table id="states" in the HTML
    createStatesDiv(propToArray(objStatesAndCaps).sort()); //randomSort2));

    // Check whether all uttons are clicked
    function allSelected() {
      return $(".capitol").length - $(".cap-used").length;
    }
    
    // Set up onClick event for buttons
    $("#btnReset").click(btnReset);
    $("#btnTryAgain").click(btnReset);
    
    $(".state").click(onStateClick);

})


  
var curState = "";
// Note:  An associative array (ie hash) in javascript is really an object with properties.
//        One would normally define the properties as obj.prop = "value"; however, since
//        some states' names have spaces, one must use the syntax obj['some prop'] = "value"
//        Is there a different way to do this?
var objStatesAndCaps = {
  "Maine":           "Augusta",
  "Vermont":         "Montpelier",
/*  "New Hampshire":   "Concord",
  "Connecticut":     "Hartford",
  "Rhode Island":    "Providence",
  "Massachusetts":   "Boston",
  "New York":        "Albany",
  "Pennsylvania":    "Harrisburg",
  "New Jersey":      "Trenton",
  "Deleware":        "Dover",
  "Maryland":        "Annapolis",
  "Virginia":        "Richmond",
  "North Carolina":  "Raleigh",
  "West Virginia":   "Charleston",
  "Kentucky":        "Frankfort",
  "Tennessee":       "Nashville", 
  "South Carolina":  "Columbia",
  "Georgia":         "Atlanta",
  "Florida":         "Tallahassee",
  "Alabama":         "Montgomery",
  "Mississippi":     "Jackson"
  */
};

var aryWrong = [];
var arySkipped=[];
var aryRightAudio = ["fantastic", "ok", "yeah", "yes"];

/* Randomly sort an array
   Thanks to: 
   http://freewebdesigntutorials.com/javaScriptTutorials/jsArrayObject/randomizeArrayElements.htm
*/
function randomSort2(a,b) {
    // Get a random number between 0 and 10
    var temp = parseInt( Math.random()*10 );

    // Get 1 or 0, whether temp is odd or even
    var isOddOrEven = temp%2;

    // Get +1 or -1, whether temp greater or smaller than 5
    var isPosOrNeg = temp>5 ? 1 : -1;

    // Return -1, 0, or +1
    return( isOddOrEven*isPosOrNeg );
}

function valToArray(a) {
  var r = [];
  for (var i in a) {
    r.push(a[i]);
  }
  return r;
}

function propToArray(a) {
  var r = [];
  for (var i in a) {
    r.push(i);
  }
  return r;
}


/* Given an array of Capitals, generate the HTML for the #capitals table.  Expects an empty
   <table id="capitals"></table> in the HTML
*/
function createCapsDiv(Capitals) {
  for (var c=0; c<Capitals.length; c++) {
    $("#capitals").append("<div id=\"" + Capitals[c].toId() + "\" class=\"capital\">" +
                          Capitals[c] + "</div>");
  }
  $(".capital").hide();
  $(".capital").filter(":first")
               .addClass("cur-cap")
               .show("fast")
               .click(onCapitalClick);
}

/*
 * onCapitalClick - 
 * Skip the current capital if it is clicked
*/
function onCapitalClick() {
  arySkipped.push($(this).off("click")
                         .hide("fast")
                         .removeClass("cur-cap")
                         .detach()
                         .appendTo("#capitals")
                         .text());
  console.log("skipped: " + arySkipped[arySkipped.length - 1]);
  $(".capital").not(".cap-used")
               .filter(":first")
               .addClass("cur-cap")
               .show("fast")
               .click(onCapitalClick);
}


/* Given an array of States, generate the HTML for the #states table.  Expects an empty
   <table id="states"></table> in the HTML
*/
function createStatesDiv(States) {
  for (var s=0; s<States.length; s++) {
      //$("#states").append("<div class=\"state-cap\"><div class=\"state\" id=\"" +
      //             States[s].toId() + "\">" + States[s] + "</div><div class=\"ans\">" + 
      //             "</div></div>");
      $("#states").append('<div class="state">' + States[s] + '</div>');
  }
}

/* 
** When a state is clicked... 
**  -- If it is correct, fade out the state & capital and mark the capital as .cap-used, and fade in the new capital
**  -- If it is wrong, put the capital at the end of the list, fade it out, and fade in the new one 
**  -- But, if it is all done, then show the score
*/
function onStateClick() {

  $(this).off("click");
  var curcap = $(".cur-cap").off("click");

  console.log("clicked state: " + $(this).text() + "  visible cap: " + curcap.text() + "  should be: " + objStatesAndCaps[$(this).text()]);
  
  // if correct
  if (curcap.text() == objStatesAndCaps[$(this).text()]) {
    console.log("-- right!");
    $("#fantastic")[0].play();
    curcap.addClass("cap-used").removeClass("cur-cap").hide("fast");
    $(this).addClass("state-used").fadeOut("fast");
  }
  // if wrong
  else {
    console.log("-- wrong!");
    $(this).effect("shake",function() { $(this).click(onStateClick) });
    $("#wrong")[0].play();
    curcap.removeClass("cur-cap").hide("fast").detach().appendTo("#capitals").click(onCapitalClick); 
    aryWrong.push(curcap.text() + ", " + $(this).text());
    $("#message-div").stop().css({"font-size":"0em","top":"15px","left":"-20px","opacity":"1"}).text("WRONG!!").animate({left: "+=60%",opacity: "0",fontSize: "+5em"}, 2000);
  }

  if ($(".state").length == $(".state-used").length) {
    //alert("Winner!  You missed " + aryWrong.length + ".  You skipped " + arySkipped.length);
    finalResults();
    //var ddd = $("body").append('<div class="overlay">You are BOSS</div>');
  }
  else {
    $(".capital").not(".cap-used").filter(":first").addClass("cur-cap").show("fast",function() { $(this).click(onCapitalClick) });
  }
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

  var sorted_res = propToArray(res).sort();

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
      $("<tr class='result-row'><td>" + c + "</td><td>" + res[c].wrong + "</td><td>" + res[c].skipped + "</td></tr>").insertAfter($("#results-table tr:last"));
    }

  }

  $(".container").hide();
  $("#results").fadeIn();
  
}


function btnReset() {
  aryWrong = [];
  arySkipped=[];

  $(".capital").off("click").remove();
  createCapsDiv(valToArray(objStatesAndCaps).sort(randomSort2));

  $(".state").off("click").removeClass("state-used").fadeIn("fast").click(onStateClick);

  $("#results").hide();
  //$(".container:not(#results").fadeIn();
  $(".container").not("#results").fadeIn();
}

// A few additional prototypes to make things a bit easier to deal with
String.prototype.toId = function () {return this.replace(/ /g, "_");};
String.prototype.toState = function () {return this.replace(/_/g, " ");};

