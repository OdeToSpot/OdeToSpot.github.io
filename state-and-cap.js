// jQuery
  $(document).ready(function() {

    // Create the "#capitals" table.  Expects <table id="capitals> in the HTML
    createCapsDiv(capsToArray(objStatesAndCaps).sort(randomSort2));
    
    // Create the "#states" table.  Expects <table id="states" in the HTML
    createStatesDiv(statesToArray(objStatesAndCaps).sort()); //randomSort2));

    // Check whether all uttons are clicked
    function allSelected() {
      return $(".capitol").length - $(".cap-used").length;
    }
    
    // Set up onClick event for submit button
    
    $("#btnReset").click(function() {

      aryWrong = [];

      $(".capital").remove();
      createCapsDiv(capsToArray(objStatesAndCaps).sort(randomSort2));

      $(".state").removeClass("state-used").fadeIn("fast");
      
    });
  
    $(".state").click(onStateClick);

})
  
var curState = "";
// Note:  An associative array (ie hash) in javascript is really an object with properties.
//        One would normally define the properties as obj.prop = "value"; however, since
//        some states' names have spaces, one must use the syntax obj['some prop'] = "value"
//        Is there a different way to do this?
var objStatesAndCaps = {};
objStatesAndCaps['Main']            = "Augusta";
objStatesAndCaps['Vermont']         = "Montpelier";
objStatesAndCaps['New Hampshire']   = "Concord";
objStatesAndCaps['Connecticut']     = "Hartford";
objStatesAndCaps['Rhode Island']    = "Providence";
objStatesAndCaps['Massachusetts']   = "Boston";
objStatesAndCaps['New York']        = "Albany";
objStatesAndCaps['Pennsylvania']    = "Harrisburg";
objStatesAndCaps['New Jersey']      = "Trenton";
objStatesAndCaps['Deleware']        = "Dover";
objStatesAndCaps['Maryland']        = "Annapolis";
objStatesAndCaps['Virginia']        = "Richmond";
objStatesAndCaps['North Carolina']  = "Raleigh";
objStatesAndCaps['West Virginia']   = "Charleston";
objStatesAndCaps['Kentucky']        = "Frankfort";
objStatesAndCaps['Tennessee']       = "Nashville"; 

var aryWrong = [];

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

// Takes an associated array and returns an array of its keys in random order
function capsToArray(a) {
  var r = [];
  for (var i in a) {
    r.push(a[i]);
  }
  return r;
}

function statesToArray(a) {
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
  $(".capital").filter(":first").addClass("cur-cap").show("slow");
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

  var curcap = $(".cur-cap");

  console.log("clicked state: " + $(this).text() + "  visible cap: " + curcap.text() + "  should be: " + objStatesAndCaps[curcap.text()]);
  
  // if correct
  if (curcap.text() == objStatesAndCaps[$(this).text()]) {
    console.log("-- right!");
    curcap.addClass("cap-used").removeClass("cur-cap").hide("fast");
    $(this).addClass("state-used").fadeOut("slow");
  }
  // if wrong
  else {
    console.log("-- wrong!");
    curcap.removeClass("cur-cap").hide("fast").detach().appendTo("#capitals"); 
    aryWrong.push(curcap.text() + ", " + $(this).text());
    $("#message-div").stop().css({"font-size":"0em","top":"15px","left":"-20px","opacity":"1"}).text("WRONG!!").animate({left: "+=60%",opacity: "0",fontSize: "+5em"}, 2000);
  }

  if ($(".state").length == $(".state-used").length) {
    alert("Winner!  You missed " + aryWrong.length);
  }
  else {
    $(".capital").not(".cap-used").filter(":first").addClass("cur-cap").show("slow");
  }
}
  

// A few additional prototypes to make things a bit easier to deal with
String.prototype.toId = function () {return this.replace(/ /g, "_");};
String.prototype.toState = function () {return this.replace(/_/g, " ");};

