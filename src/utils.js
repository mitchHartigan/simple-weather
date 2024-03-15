// take coordinates as string in url endpoint.
// coordinates are going to be supplied by us from the leaflet map and not by the end user.
const { mappings } = require("../public/iconMappings");
const { inspect } = require("util");

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

function genDailyForecast(weeklyForecastPeriods) {
  // concatenate the day and night periods together with a high/low values.
  const dailyForecast = [];
  const periodMap = {
    Now: [],
  };

  // let periodMap = {
  //   current: ["today", "tonight"],
  //   Saturday: ["Saturday", "Saturday Night"],
  //   Sunday: ["Sunday", "Sunday Night"],
  // etc etc
  // };

  // create periodMap data structure above:
  for (let period of weeklyForecastPeriods) {
    if (
      period.name === "Today" ||
      period.name === "Tonight" ||
      period.name === "This Afternoon" ||
      period.name === "This Morning" ||
      period.name === "Overnight"
    ) {
      periodMap["Now"].push(period);
      continue;
    }

    let dayOfWeek = period.name;

    if (period.name.includes("Night")) {
      dayOfWeek = period.name.split(" ")[0];
    }

    if (!Object.keys(periodMap).includes(dayOfWeek)) {
      periodMap[dayOfWeek] = [period];
      continue;
    }

    periodMap[dayOfWeek].push(period);
  }

  // use periodMap data structure to combine for ex. "Saturday" and "Saturday Night" periods into
  // one combined period:
  for (let key of Object.keys(periodMap)) {
    const { name } = periodMap[key][0];
    const single = periodMap[key].length === 1;

    let combinedPeriod = {
      name,
      single,
      temperature: null,
      icon: null,
      humidity: null,
      precipitation: null,
    };

    periodMap[key].forEach((period, i) => {
      const {
        icon,
        temperature,
        relativeHumidity,
        probabilityOfPrecipitation,
      } = period;

      if (single) {
        combinedPeriod.temperature = temperature;
        combinedPeriod.icon = icon;
        combinedPeriod.humidity = relativeHumidity.value;
        combinedPeriod.precipitation = probabilityOfPrecipitation.value;
        return;
      }

      if (i === 0) {
        combinedPeriod.temperature = { high: temperature, low: "n/a" };
        combinedPeriod.icon = { high: icon, low: "n/a" };
        combinedPeriod.humidity = { high: relativeHumidity.value, low: "n/a" };
        combinedPeriod.precipitation = {
          high: probabilityOfPrecipitation.value,
          low: "n/a",
        };
        return;
      }

      combinedPeriod.temperature.low = temperature;
      combinedPeriod.icon.low = icon;
      combinedPeriod.humidity.low = relativeHumidity.value;
      combinedPeriod.precipitation.low = probabilityOfPrecipitation.value;
      return;
    });

    dailyForecast.push(combinedPeriod);
  }

  return dailyForecast;
}

function parseForecastDetails(weeklyForecast, hourlyForecast) {
  const { properties, geometry } = weeklyForecast;
  const { periods, ...details } = properties;
  const dailyForecast = genDailyForecast(periods);
  const currentPeriod = hourlyForecast[0];
  currentPeriod.detailedForecast =
    weeklyForecast.properties.periods[0].detailedForecast;

  return {
    coordinates: geometry.coordinates,
    dailyForecast: dailyForecast,
    details: {
      ...details,
      currentPeriod,
    },
  };
}

async function fetchWithRetries(url, maxRetries, delay) {
  let retries = 0;
  while (retries < maxRetries) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        console.error(`Request failed with status ${response.status}`);
      }
    } catch (error) {
      console.error(`Error fetching data: ${error.message}`);
    }
    retries++;

    if (retries < maxRetries) {
      console.log(`Retrying in ${delay} milliseconds...`);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
  console.error(
    `Exceeded maximum retries (${maxRetries}). Unable to fetch data.`
  );
  return null;
}

async function getWeeklyForecast(url) {
  const result = await fetchWithRetries(url, 3, 2500);
  const { periods } = result?.properties;
  const { coordinates } = result?.geometry;
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
  const { periods } = result?.properties;
  const newPeriods = createLocalImgUrls(periods);
  return newPeriods;
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
