var statesAndCaps = {
  __stateToCap: {
    "Maine":           "Augusta",
    "Vermont":         "Montpelier",
    "New Hampshire":   "Concord",
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
  },

  /*
   * Return a list of all the states in sorted order
   */
  get allStates() {
    return Object.keys(this.__stateToCap).sort();
  },

  /*
   * Return a list of all the capitals in random order
   */
  get allCaps() {
    var c=[];
    for (var i in this.__stateToCap) {
      c.push(this.__stateToCap[i]);
    }
    return c.sort(randomSort2).sort(randomSort2).sort(randomSort2);
  },

  /*
   * This will tell whether 'states' or 'capitals' are 
   * currently driving this thing.  The webpage assumes 'capitals' are
   * being displayed at the top of the page, but by switching the 
   * key/value pairs, we can show the state at the top.
   */
  get curDriver() {
    if (this.__stateToCap.hasOwnProperty("Pennsylvania")) {
      return 'Captial';
    }
    else {
      return 'State';
    }
  },

  /*
   * Flip from states being the keys to capitals
   */
  flipDriver: function() { 
    var reverse = {};
    for (var p in this.__stateToCap) {
      reverse[this.__stateToCap[p]] = p;
    }
    this.__stateToCap = reverse;
    return this.curDriver;
  },

  /*
   * Gets the capital of the passed in state
   */
  getCapOf: function(s) {
    return this.__stateToCap[s];
  }
};

/* 
 * Randomly sort an array
 * Thanks to: 
 * http://freewebdesigntutorials.com/javaScriptTutorials/jsArrayObject/randomizeArrayElements.htm
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
