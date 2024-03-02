"use strict";
// take coordinates as string in url endpoint.
// coordinates are going to be supplied by us from the leaflet map and not by the end user.
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWeeklyForecast = exports.getForecastRegion = exports.parseCoordinates = void 0;
function parseCoordinates(str) {
    const coords = str.split(",");
    return { latitude: coords[0], longitude: coords[1] };
}
exports.parseCoordinates = parseCoordinates;
async function getForecastRegion(latitude, longitude) {
    const url = `https://api.weather.gov/points/${latitude},${longitude}`;
    console.log("url", url);
    const response = await fetch(url);
    const result = await response.json();
    // console.log("region result", result);
    // console.log("forecastOffice", result.properties.relativeLocation.geometry);
    const endpoint = result.properties.forecast;
    return endpoint;
}
exports.getForecastRegion = getForecastRegion;
async function getWeeklyForecast(url) {
    const response = await fetch(url);
    const result = await response.json();
    const { periods } = result.properties;
    const { coordinates } = result.geometry;
    const polygonCoords = formatPolygon(coordinates[0]);
    return { periods, polygonCoords };
}
exports.getWeeklyForecast = getWeeklyForecast;
function formatPolygon(coordinates) {
    // strip duplicate starting coordinate.
    coordinates.splice(4, 1);
    // put latitude first in front of longitude. Not sure
    // why they are reversed in weather gov API response...
    for (let coordinate of coordinates) {
        coordinate.reverse();
    }
    return coordinates;
}
