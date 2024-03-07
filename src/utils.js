// take coordinates as string in url endpoint.
// coordinates are going to be supplied by us from the leaflet map and not by the end user.
const { mappings } = require("../public/iconMappings");

function parseCoordinates(str) {
  const coords = str.split(",");
  return { latitude: coords[0], longitude: coords[1] };
}

async function getForecastRegion(latitude, longitude) {
  const url = `https://api.weather.gov/points/${latitude},${longitude}`;
  console.log("url", url);
  const response = await fetch(url);
  const result = await response.json();
  console.log("result", result);
  const dailyEndpoint = result.properties.forecast;
  const hourlyEndpoint = result.properties.forecastHourly;
  return { dailyEndpoint, hourlyEndpoint };
}

function parseIconUrl(iconURL) {
  // parses icon image name from icon endpoint url
  let fragments = iconURL.split("?")[0].split("/");
  const iconCode = fragments.at(6);
  const type = fragments.at(5);
  console.log({ type, iconCode });
  return mappings[type][iconCode];
}

function createLocalImgUrls(periods) {
  const newPeriods = [];
  for (let period of periods) {
    let iconCode = parseIconUrl(period.icon);
    const newPeriod = {
      ...period,
      icon: `${iconCode}.svg`,
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

async function getHourlyForecast(url) {
  const response = await fetch(url);
  const result = await response.json();
  return result.properties.periods;
}

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

module.exports = {
  getWeeklyForecast,
  getHourlyForecast,
  getForecastRegion,
  parseCoordinates,
};
