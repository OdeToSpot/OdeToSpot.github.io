// jQuery
  $(document).ready(function(){
    
    // Create the "#capitals" table.  Expects <table id="capitals> in the HTML
    createCapsDiv(capsToArray(objStatesAndCaps).sort(randomSort2));
    
    // Create the "#states" table.  Expects <table id="states" in the HTML
    createStatesDiv(statesToArray(objStatesAndCaps).sort(randomSort2));

    // Check whether all uttons are clicked
    function allSelected() {
      return $(".capitol").length - $(".cap-used").length;
    }
    
    // Set up onClick event for submit button
    
    $("#btnReset").click(function() {
      $(".ans").text("").removeClass("wrong");
      $(".capital").removeClass("cap-used cap-clicked");
      /*$(".capital").removeClass("cap-used").removeClass("cap-clicked");*/
/*
      if ($(".cap-used").length == $(".capitol").length) {
        alert("Complete the quiz before submitting");
        return 1;
      }
      
      $(".state-cap").each(function() {
        var state = $(this).find(".state");
        var cap   = $(this).find(".ans");
        console.log(state.text() + " - " + cap.text());
        if (cap.text() !== objStatesAndCaps[state.text()]) {
          //state.addClass("wrong");
          //$(this).addClass("wrong");
          cap.addClass("wrong");
        }
      });
      if ($(".wrong") == 0) {
        alert("Yea! They are all correct!");
      }
      else {
        alert ("You missed a few :(  Keep trying!")
      }
*/
    });
  
    // Set the onClick event for each cell in the #capitals table
     $("#capitals").on("click",".capital",onCapClick);
     
    // The onCapClick function highights the capital, 
    // so it is ready to use in an answer
     function onCapClick(e) {
      var curSel = $(".cap-clicked"); // get all curently selected (should only be 1!)
      if (! $(this).hasClass("cap-used")) {
        $(this).toggleClass("cap-clicked"); // select the current one
      }
      curSel.removeClass("cap-clicked");  // remove from the rest - note, if the cur was selected, this will unselect it, which is what we want
      
     }

    // Set the onClick event for each #state cell
    $("#states").on("click",".state-cap",onStateClick);
    
    // The onStateClick function enters the selected capital
    function onStateClick(e) {
      var state = $(this).find(".state");
      var cap = $(this).find(".ans");

      cap.removeClass("wrong");
      
      if (cap.text() > "") {
        //alert(cap.text() + " - " + cap.text().toId());
        $("#" + cap.text().toId()).removeClass("cap-used");
        cap.text("");
      }
      
      if ($(".cap-clicked")) {
        cap.text($(".cap-clicked").text());
        $(".cap-clicked").addClass("cap-used").removeClass("cap-clicked");
      }
      
      if (cap.text() == objStatesAndCaps[state.text()]) {
        cap.addClass("right");
      }
      else if (cap.text() !== "") {
        cap.addClass("wrong");
      }
      
      if ($(".right").length == $(".capital").length) {
        alert("Woo! You did it!");
        $("#states").off("click");
        $("#capitals").off("click");
      }
    }
  }); 
  
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
}

/* Given an array of States, generate the HTML for the #states table.  Expects an empty
   <table id="states"></table> in the HTML
*/
function createStatesDiv(States) {
  for (var s=0; s<States.length; s++) {
      $("#states").append("<div class=\"state-cap\"><div class=\"state\" id=\"" +
                   States[s].toId() + "\">" + States[s] + "</div><div class=\"ans\">" + 
                   "</div></div>");
  }
}

// A few additional prototypes to make things a bit easier to deal with
String.prototype.toId = function () {return this.replace(/ /g, "_");};
String.prototype.toState = function () {return this.replace(/_/g, " ");};


// Pure javascript 
/*
    var thisGuy = document.querySelector("#capitals");
    thisGuy.addEventListener("click",doIt,false);
    alert("Hey " + thisGuy.id);
    

    function doIt(e) {
      if (e.target !== e.currentTarget) {
        e.target.classList.toggle("was-clicked");
        }
        
        e.stopPropagation();
    }
*/
