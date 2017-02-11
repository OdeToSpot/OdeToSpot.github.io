//global vars

// Note:  An associative array (ie hash) in javascript is really an object with properties.
//        One would normally define the properties as obj.prop = "value"; however, since
//        some states' names have spaces, one must use the syntax obj['some prop'] = "value"
//        Is there a different way to do this?
var objStatesAndCaps = {
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
};

var objStateAbbrev = {
  AL: 'Alabama',
  AK: 'Alaska',
  AZ: 'Arizona',
  AR: 'Arkansas',
  CA: 'California',
  CO: 'Colorado',
  CT: 'Connecticut',
  DE: 'Delaware',
  FL: 'Florida',
  GA: 'Georgia',
  HI: 'Hawaii',
  ID: 'Idaho',
  IL: 'Illinois',
  IN: 'Indiana',
  IA: 'Iowa',
  KS: 'Kansas',
  KY: 'Kentucky',
  LA: 'Louisiana',
  ME: 'Maine',
  MD: 'Maryland',
  MA: 'Massachusetts',
  MI: 'Michigan',
  MN: 'Minnesota',
  MS: 'Mississippi',
  MO: 'Missouri',
  MT: 'Montana',
  NE: 'Nebraska',
  NV: 'Nevada',
  NH: 'New Hampshire',
  NJ: 'New Jersey',
  NM: 'New Mexico',
  NY: 'New York',
  NC: 'North Carolina',
  ND: 'North Dakota',
  OH: 'Ohio',
  OK: 'Oklahoma',
  OR: 'Oregon',
  PA: 'Pennsylvania',
  RI: 'Rhode Island',
  SC: 'South Carolina',
  SD: 'South Dakota',
  TN: 'Tennessee',
  TX: 'Texas',
  UT: 'Utah',
  VT: 'Vermont',
  VA: 'Virginia',
  WA: 'Washington',
  WV: 'West Virginia',
  WI: 'Wisconsin',
  WY: 'Wyoming'
};
  
