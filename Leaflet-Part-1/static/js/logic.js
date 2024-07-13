// Initialize the map
var map = L.map('map').setView([20, 0], 2);

// Add a tile layer to the map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Function to get color based on magnitude
function getColor(depth) {
    return depth > 90 ? '#654c8d' :
           depth > 70 ? '#8e5a91' :
           depth > 50 ? '#c46b8f' :
           depth > 30 ? '#d9828e' :
           depth > 10 ? '#e8998f' :
                        '#fbcd9b';
}

// Function to style the circles
function style(feature) {
    return {
        radius: feature.properties.mag * 3,
        fillColor: getColor(feature.geometry.coordinates[2]),
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
    };
}

// Function to bind popups to the circles
function onEachFeature(feature, layer) {
    if (feature.properties && feature.properties.place) {
        layer.bindPopup("<b>Location:</b> " + feature.properties.place +
                        "<br><b>Magnitude:</b> " + feature.properties.mag +
                        "<br><b>Depth:</b> " + feature.geometry.coordinates[2] + " km");
    }
}

// Fetch earthquake data from the USGS feed
fetch('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson')
    .then(response => response.json())
    .then(data => {
        L.geoJSON(data, {
            pointToLayer: function (feature, latlng) {
                return L.circleMarker(latlng);
            },
            style: style,
            onEachFeature: onEachFeature
        }).addTo(map);
    })
    .catch(error => console.error('Error fetching the earthquake data:', error));

// Add legend to the map
var legend = L.control({ position: 'bottomright' });

legend.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'info legend'),
        grades = [-10, 10, 30, 50, 70, 90];

    var legendContainer = document.createElement('div');
    legendContainer.style.display = 'flex';
    legendContainer.style.flexDirection = 'column';

    for (var i = 0; i < grades.length; i++) {
        var item = document.createElement('div');
        item.style.display = 'flex';
        item.style.alignItems = 'center';
        item.style.marginBottom = '4px';

        var colorBox = document.createElement('i');
        colorBox.style.background = getColor(grades[i] + 1);
        colorBox.style.width = '18px';
        colorBox.style.height = '18px';
        colorBox.style.marginRight = '8px';

        var label = document.createElement('span');
        label.innerHTML = grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] : '+');

        item.appendChild(colorBox);
        item.appendChild(label);
        legendContainer.appendChild(item);
    }

    div.appendChild(legendContainer);
    return div;
};

legend.addTo(map);
