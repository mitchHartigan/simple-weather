// take coordinates as string in url endpoint.
// coordinates are going to be supplied by us from the leaflet map and not by the end user.
const { mappings } = require("../public/iconMappings");

function parseCoordinates(str) {
  const coords = str.split(",");
  return { lat: coords[0], lng: coords[1] };
}

async function getForecastRegion(lat, lng) {
  console.log({ lat, lng });
  const url = `https://api.weather.gov/points/${lat},${lng}`;
  const response = await fetch(url);
  const result = await response.json();
  const dailyEndpoint = result.properties.forecast;
  const hourlyEndpoint = result.properties.forecastHourly;
  return { dailyEndpoint, hourlyEndpoint };
}

function parseIconUrl(iconURL) {
  // how about we search the iconUrl string for the matching typecode?
  /* 
    iconUrl: https://api.weather.gov/icons/land/day/few?size=medium
    iconUrl: https://api.weather.gov/icons/land/night/tsra_hi,40/sct?size=medium 
  */
  // parses icon image name from icon endpoint url

  let iconCode = null;
  const keys = [
    ...new Set([...Object.keys(mappings.day), ...Object.keys(mappings.night)]),
  ];

  for (let key of keys) {
    if (iconURL.includes(key)) {
      iconCode = key;
      break;
    }
  }

  if (!iconCode) {
    console.error("No icon code found.");
  }

  let fragments = iconURL.split("?")[0].split("/");
  const type = fragments.at(5);
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

function parseForecastDetails(weeklyForecast) {
  const { properties, geometry } = weeklyForecast;
  const { periods, ...details } = properties;

  return {
    coordinates: geometry.coordinates,
    dailyForecast: periods,
    details: {
      ...details,
      currentPeriod: periods[0],
    },
  };
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
  parseForecastDetails,
  getForecastRegion,
  parseCoordinates,
};
