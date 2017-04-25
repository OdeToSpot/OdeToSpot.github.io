"use strict";

var statesAndCaps = {
  __stateToCap: {
    "Alabama":    "Montgomery",
    "Alaska":   "Juneau",
    "Arizona":    "Phoenix",
    "Arkansas":   "Little Rock",
    "California":   "Sacramento",
    "Colorado":   "Denver",
    "Connecticut":    "Hartford",
    "Delaware":   "Dover",
    "Florida":    "Tallahassee",
    "Georgia":    "Atlanta",
    "Hawaii":   "Honolulu",
    "Idaho":    "Boise",
    "Illinois":   "Springfield",
    "Indiana":    "Indianapolis",
    "Iowa":   "Des Moines",
    "Kansas":   "Topeka",
    "Kentucky":   "Frankfort",
    "Louisiana":    "Baton Rouge",
    "Maine":    "Augusta",
    "Maryland":   "Annapolis",
    "Massachusetts":    "Boston",
    "Michigan":   "Lansing",
    "Minnesota":    "St. Paul",
    "Mississippi":    "Jackson",
    "Missouri":   "Jefferson City",
    "Montana":    "Helena",
    "Nebraska":   "Lincoln",
    "Nevada":   "Carson City",
    "New Hampshire":    "Concord",
    "New Jersey":   "Trenton",
    "New Mexico":   "Santa Fe",
    "New York":   "Albany",
    "North Carolina":   "Raleigh",
    "North Dakota":   "Bismarck",
    "Ohio":   "Columbus",
    "Oklahoma":   "Oklahoma City",
    "Oregon":   "Salem",
    "Pennsylvania":   "Harrisburg",
    "Rhode Island":   "Providence",
    "South Carolina":   "Columbia",
    "South Dakota":   "Pierre",
    "Tennessee":    "Nashville",
    "Texas":    "Austin",
    "Utah":   "Salt Lake City",
    "Vermont":    "Montpelier",
    "Virginia":   "Richmond",
    "Washington":   "Olympia",
    "West Virginia":    "Charleston",
    "Wisconsin":    "Madison",
    "Wyoming":    "Cheyenne"
  },
  __stateAbbv: {
    'Alabama': 'AL',
    'Alaska': 'AK',
    'Arizona': 'AZ',
    'Arkansas': 'AR',
    'California': 'CA',
    'Colorado': 'CO',
    'Connecticut': 'CT',
    'Delaware': 'DE',
    'Florida': 'FL',
    'Georgia': 'GA',
    'Hawaii': 'HI',
    'Idaho': 'ID',
    'Illinois': 'IL',
    'Indiana': 'IN',
    'Iowa': 'IA',
    'Kansas': 'KS',
    'Kentucky': 'KY',
    'Louisiana': 'LA',
    'Maine': 'ME',
    'Maryland': 'MD',
    'Massachusetts': 'MA',
    'Michigan': 'MI',
    'Minnesota': 'MN',
    'Mississippi': 'MS',
    'Missouri': 'MO',
    'Montana': 'MT',
    'Nebraska': 'NE',
    'Nevada': 'NV',
    'New Hampshire': 'NH',
    'New Jersey': 'NJ',
    'New Mexico': 'NM',
    'New York': 'NY',
    'North Carolina': 'NC',
    'North Dakota': 'ND',
    'Ohio': 'OH',
    'Oklahoma': 'OK',
    'Oregon': 'OR',
    'Pennsylvania': 'PA',
    'Rhode Island': 'RI',
    'South Carolina': 'SC',
    'South Dakota': 'SD',
    'Tennessee': 'TN',
    'Texas': 'TX',
    'Utah': 'UT',
    'Vermont': 'VT',
    'Virginia': 'VA',
    'Washington': 'WA',
    'West Virginia': 'WV',
    'Wisconsin': 'WI',
    'Wyoming': 'WY'
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
   * This was a quick hack but it limits the ability to change
   * some other things in this class
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
  },

  /*
   * Get the abbreviation for thet state
   * Note that if sates and caps are 'flipped' this 
   * this will return undefined
   */
  getAbbv: function(s) {
      var a =  this.__stateAbbv[s];
      if (a === undefined) {
        console.log('!! Not getAbbv found for ' + s);
      }
      return a;
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
