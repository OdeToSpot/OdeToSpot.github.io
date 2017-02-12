How to use the mutable properties (https://github.com/NewSignature/us-map/pull/18)

Markup:

<div id="state-selection-map"></div>
<input type="checkbox" class="state" value="al">
<input type="checkbox" class="state" value="ak">
<input type="checkbox" class="state" value="az">
<input type="checkbox" class="state" value="ar">
<!-- snipped the other 46 states :) -->

JavaScript:

$('#state-selection-map').usmap({/* snipped configuration details */});

// Change the state color when the checkbox changes
$('input.state').change(function(e) {
  // Get a reference to the checkbox as a jQuery object
  var $this = $(this);

  // Get the US Map plugin state ID
  var usMapStateId = $this.data('state-id').toUpperCase();

  // If the checkbox is checked, set the new color to blue, otherwise white
  var newFill = $this.is(':checked') ? '#0548d3' : '#fff';

  // Initialize and fill out style object
  var styles = {};
  styles[usMapStateId] = {fill:newFill};

  // Use new method to set the stateSpecificStyles property
  $('#state-selection-map').usmap('stateSpecificStyles',styles);
});
