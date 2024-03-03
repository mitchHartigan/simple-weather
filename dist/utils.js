"use strict";
// take coordinates as string in url endpoint.
// coordinates are going to be supplied by us from the leaflet map and not by the end user.
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentWeather = exports.getWeeklyForecast = exports.parseIconUrl = exports.getForecastRegion = exports.parseCoordinates = void 0;
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
    const endpoint = result.properties.forecast;
    return endpoint;
}
exports.getForecastRegion = getForecastRegion;
function parseIconUrl(iconURL) {
    // parses icon image name from icon endpoint url
    let fragments = iconURL.split("?")[0].split("/");
    return fragments.at(-1);
}
exports.parseIconUrl = parseIconUrl;
async function getWeeklyForecast(url) {
    const response = await fetch(url);
    const result = await response.json();
    // console.log("result", result);
    const { periods } = result.properties;
    // console.log("periods", periods);
    const { coordinates } = result.geometry;
    const polygonCoords = formatPolygon(coordinates[0]);
    return {
        ...result,
        geometry: { type: "Polygon", coordinates: polygonCoords },
    };
}
exports.getWeeklyForecast = getWeeklyForecast;
function getCurrentWeather(weeklyForecast) { }
exports.getCurrentWeather = getCurrentWeather;
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
