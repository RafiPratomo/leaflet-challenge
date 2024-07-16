# Earthquake Visualization using Leaflet

This project visualizes recent earthquake data on a world map using the Leaflet library. The data is fetched from the USGS Earthquake API and displayed as circle markers with varying colors representing the depth of the earthquakes.

## Features

- Displays earthquake data on an interactive map.
- Circle markers represent the location, magnitude, and depth of earthquakes.
- A legend indicates the color coding for different depths.

## Getting Started

### Prerequisites

To run this project, you will need a basic understanding of HTML, CSS, and JavaScript. You should also have a local web server to serve the files, such as [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) for Visual Studio Code.

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/RafiPratomo/leaflet-challenge.git
    ```

2. Navigate to the project directory:
    ```sh
    cd earthquake-visualization
    ```

3. Open the `index.html` file in your web browser, or use a local web server to serve the files.

### Files

- `index.html`: The main HTML file that includes the map and links to the necessary CSS and JS files.
- `static/css/style.css`: The CSS file for styling the map and legend.
- `static/js/logic.js`: The JavaScript file containing the logic for fetching data and rendering the map.

### Usage

Open the `index.html` file in your web browser to view the map with the earthquake data.

## Data Source

The earthquake data is fetched from the [USGS Earthquake API](https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson), which provides real-time information on recent earthquakes around the world.

## Customization

You can customize the visualization by editing the following functions in `static/js/logic.js`:

- `getColor(depth)`: Adjust the colors used for different earthquake depths.
- `style(feature)`: Modify the appearance of the circle markers.
- `onEachFeature(feature, layer)`: Customize the popup information for each earthquake marker.
