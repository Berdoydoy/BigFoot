var stateNames  = ["Alaska",
"Alabama",
"Arkansas",
"Arizona",
"California",
"Colorado",
"Connecticut",
"Delaware",
"Florida",
"Georgia",
"Iowa",
"Idaho",
"Illinois",
"Indiana",
"Kansas",
"Kentucky",
"Louisiana",
"Massachusetts",
"Maryland",
"Maine",
"Michigan",
"Minnesota",
"Missouri",
"Mississippi",
"Montana",
"North Carolina",
"North Dakota",
"Nebraska",
"New Hampshire",
"New Jersey",
"New Mexico",
"Nevada",
"New York",
"Ohio",
"Oklahoma",
"Oregon",
"Pennsylvania",
"Rhode Island",
"South Carolina",
"South Dakota",
"Tennessee",
"Texas",
"Utah",
"Virginia",
"Vermont",
"Washington",
"Wisconsin",
"West Virginia",
"Wyoming"]

var stateButtonsContainer = document.getElementById('state-buttons');

stateNames.forEach(function(stateName) {
  var stateButtonContainer = document.createElement('div'); // Create a container for each state button
  stateButtonContainer.className = 'state-button-container'; // Add a custom class for styling

  var stateButton = document.createElement('button'); // Create a button instead of an input element
  stateButton.id = stateName;
  stateButton.textContent = stateName;

  stateButton.addEventListener('click', function() {
    stateButton.classList.toggle('active'); // Toggle the 'active' class on button click
    toggleMarkers(); // Call the toggleMarkers function when the button is clicked
  });

  stateButtonContainer.appendChild(stateButton);
  stateButtonsContainer.appendChild(stateButtonContainer);
});


function toggleMarkers() {
  var stateButtons = document.querySelectorAll('.state-button-container button'); // Select all state buttons
  stateButtons.forEach(function(stateButton) {
    var stateName = stateButton.id;
    var stateMarkers = markers[stateName]; // Array of markers associated with the state

    if (stateButton.classList.contains('active')) {
      // Show markers
      stateMarkers.forEach(function(stateMarker) {
        var customIcon = L.icon({
          iconUrl: '/static/marker-icon.png',
          iconSize: [16, 16],
          popupAnchor: [0, -16]
        });

        var latitude = staMarker.coords[0];
        var longitude = stateMarker.coords[1];
        var description = stateMarker.Environment;
        var markerClass = stateMarker.Class;
        var markerSeason = stateMarker.Season;
        var markerYear = stateMarker.Year;
        var markerMonth = stateMarker.Month;
        var markerCounty = stateMarker.County;

        // Create the marker with the custom icon
        var marker = L.marker([latitude, longitude], { icon: customIcon }).addTo(map);

        // Create the popup content using the extracted information
        var popupContent = `
        <div class="popup-content">
        <div class="row">
          <div class="column">
            <div class="label">Class</div>
            <div class="value">${markerClass}</div>
          </div>
          <div class="column">
            <div class="label">Month, Year</div>
            <div class="value">${markerMonth}, ${markerYear}</div>
          </div>
          <div class="column">
            <div class="label">Season</div>
            <div class="value">${markerSeason}</div>
          </div>
        </div>
        <div class="row">
          <div class="column full">
            <div class="label">Description</div>
            <div class="value">${description}</div>
          </div>
        </div>
        <div class="row">
          <div class="column">
            <div class="label">County</div>
            <div class="value">${markerCounty}</div>
          </div>
          <div class="column">
            <div class="label">Coords</div>
            <div class="value">${latitude}, ${longitude}</div>
          </div>
        </div>
      </div>
      
      `;

        // Bind the custom popup content to the marker
        marker.bindPopup(popupContent);

        // Store the marker object in the markers array
        markers[stateName].push(marker);
      });
    } else {
      // Hide markers
      stateMarkers.forEach(function(marker) {
        map.removeLayer(marker);
      });
    }
  });
}

var markers = {
 'Alaska':[],
 'Alabama':[],
 'Arkansas':[],
 'Arizona':[],
 'California':[],
 'Colorado':[],
 'Connecticut':[],
 'Delaware':[],
 'Florida':[],
 'Georgia':[],
 'Iowa':[],
 'Idaho':[],
 'Illinois':[],
 'Indiana':[],
 'Kansas':[],
 'Kentucky':[],
 'Louisiana':[],
 'Massachusetts':[],
 'Maryland':[],
 'Maine':[],
 'Michigan':[],
 'Minnesota':[],
 'Missouri':[],
 'Mississippi':[],
 'Montana':[],
 'North Carolina':[],
 'North Dakota':[],
 'Nebraska':[],
 'New Hampshire':[],
 'New Jersey':[],
 'New Mexico':[],
 'Nevada':[],
 'New York':[],
 'Ohio':[],
 'Oklahoma':[],
 'Oregon':[],
 'Pennsylvania':[],
 'Rhode Island':[],
 'South Carolina':[],
 'South Dakota':[],
 'Tennessee':[],
 'Texas':[],
 'Utah':[],
 'Virginia':[],
 'Vermont':[],
 'Washington':[],
 'Wisconsin':[],
 'West Virginia':[],
 'Wyoming':[]
};

var map = L.map('map').setView([37.0902, -95.7129], 4);

// Choose a tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
}).addTo(map);

// Assuming you have a list of sightings containing latitude and longitude coordinates
var sightings;
var xhr = new XMLHttpRequest();
xhr.open('GET', '/static/data.json');
xhr.onreadystatechange = function () {
  if (xhr.readyState === 4 && xhr.status === 200) {
    sightings = JSON.parse(xhr.responseText);
    // Process the 'sightings' data as needed

    // Loop through the list of sightings and create markers with custom icons
    for (var i = 0; i < sightings.length; i++) {
        var sighting = sightings[i];
        var state = sighting.State.trim()
        if( state in markers){
            markers[state].push(sighting)
        }
    }
  }
};
xhr.send();

