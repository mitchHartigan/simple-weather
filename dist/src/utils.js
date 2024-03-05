"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentWeather = exports.getWeeklyForecast = exports.parseIconUrl = exports.getForecastRegion = exports.parseCoordinates = void 0;
// take coordinates as string in url endpoint.
// coordinates are going to be supplied by us from the leaflet map and not by the end user.
const iconMappings_1 = require("../public/iconMappings");
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
    const iconCode = fragments.at(-1);
    const type = fragments.at(-2);
    console.log("icon?", iconMappings_1.mappings[type][iconCode]);
    return iconMappings_1.mappings[type][iconCode];
}
exports.parseIconUrl = parseIconUrl;
function createLocalImgUrls(periods) {
    const newPeriods = [];
    for (let period of periods) {
        let iconCode = parseIconUrl(period.icon);
        const newPeriod = {
            ...period,
            icon: `http://localhost:3000/weather-icons/${iconCode}.svg`,
        };
        newPeriods.push(newPeriod);
    }
    return newPeriods;
}
async function getWeeklyForecast(url) {
    const response = await fetch(url);
    const result = await response.json();
    const { periods } = result.properties;
    const { coordinates } = result.geometry;
    const polygonCoords = formatPolygon(coordinates[0]);
    const newPeriods = createLocalImgUrls(periods);
    return {
        ...result,
        properties: {
            ...result.properties,
            periods: newPeriods,
        },
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
