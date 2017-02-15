/*
 * Global Vars
 */
var curState = "";
var aryWrong = [];
var arySkipped=[];


/*
 * jQuery
 */
  $(document).ready(function() {

    $("#hamburger-menu").hide();
    $("#hamburger").click(function() {
      $("#hamburger-menu").slideToggle();
    });

    $("#toggle-audio").click(function() {
      if ($(this).text() == "Audio: Off") {
        $(this).text("Audio: On");
      }
      else {
        $(this).text("Audio: Off");
      }
      $("#hamburger").click();
    });

    $("#toggle-state-cap").click(function() {
      if ($(".state-used").length == 0 || confirm("This will reset your current game.  Continue?")) {
        $("#toggle-state-cap").text("Play by: " + statesAndCaps.flipDriver());
        initialize();
      }
      $("#hamburger").click();
    });

    // Set up onClick event for buttons
    $("#btnReset").click(initialize);
    $("#btnTryAgain").click(initialize);

    // The Reset button basically re-initilaizes everything
    initialize();
})

/*
 * Initialize the main logic and ui
 */
function initialize() {
  aryWrong = [];
  arySkipped=[];

  // Create the "#capitals" table.  Expects <table id="capitals> in the HTML
  $(".capital").off("click").remove();
  createCapsDiv(statesAndCaps.allCaps);
    
  // Create the "#states" table.  Expects <table id="states" in the HTML
  $(".state").off("click").remove();
  createStatesDiv(statesAndCaps.allStates); 

  $(".state").fadeIn("fast").click(onStateClick);

  $("#results").hide();
  $(".container").not("#results").fadeIn();
}

/* 
 * Given an array of Capitals, generate the HTML for the #capitals table.  Expects an empty
 *  <table id="capitals"></table> in the HTML
 */
function createCapsDiv(Capitals) {
  for (var c=0; c<Capitals.length; c++) {
    $("#capitals").append('<div id="' + Capitals[c].toId() + '" class="capital">' +
                          Capitals[c] + '</div>');
  }
  $(".capital").hide();
  $(".capital").filter(":first")
               .addClass("cur-cap")
               .show("fast")
               .click(onCapitalClick);
}

/* 
 * Given an array of States, generate the HTML for the #states table.  Expects an empty
 *  <table id="states"></table> in the HTML
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

/* 
 * When a state is clicked... 
 *  -- If it is correct, fade out the state & capital and mark the capital as .cap-used, and fade in the new capital
 *  -- If it is wrong, put the capital at the end of the list, fade it out, and fade in the new one 
 *  -- But, if it is all done, then show the score
 */
function onStateClick() {
  $(this).off("click");
  var curcap = $(".cur-cap").off("click");

  console.log("clicked state: " + $(this).text() + "  visible cap: " + curcap.text() + "  should be: " + statesAndCaps.getCapOf($(this).text()));
  
  // if correct
  if (curcap.text() == statesAndCaps.getCapOf($(this).text())) {
    console.log("-- right!");
    if ($("#toggle-audio").text() == "Audio: On") {
      $("#fantastic")[0].play();
    }
    curcap.addClass("cap-used").removeClass("cur-cap").hide("fast");
    $(this).addClass("state-used").fadeOut("fast");
  }
  // if wrong
  else {
    console.log("-- wrong!");
    $(this).effect("shake",function() { $(this).click(onStateClick) });
    if ($("#toggle-audio").text() == "Audio: On") {
      $("#wrong")[0].play();
    }
    curcap.removeClass("cur-cap").hide("fast").detach().appendTo("#capitals").click(onCapitalClick); 
    aryWrong.push(curcap.text() + ", " + $(this).text());
    $("#message-div").stop().css({"font-size":"0em","top":"15px","left":"-20px","opacity":"1"})
	                   .text("WRONG!!").animate({left: "+=60%",opacity: "0",fontSize: "+5em"}, 2000);
  }

  if ($(".state").length == $(".state-used").length) {
    //alert("Winner!  You missed " + aryWrong.length + ".  You skipped " + arySkipped.length);
    finalResults();
    //var ddd = $("body").append('<div class="overlay">You are BOSS</div>');
  }
  else {
    $(".capital").not(".cap-used").filter(":first").addClass("cur-cap")
                 .show("fast",function() { $(this).click(onCapitalClick) });
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
  $("#results").fadeIn();
  
}

// A few additional prototypes to make things a bit easier to deal with
String.prototype.toId = function () {return this.replace(/ /g, "_");};
String.prototype.toState = function () {return this.replace(/_/g, " ");};

