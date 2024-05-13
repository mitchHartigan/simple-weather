// take coordinates as string in url endpoint.
// coordinates are going to be supplied by us from the leaflet map and not by the end user.
const { mappings } = require("../public/iconMappings");
const { fetchWeatherApi } = require("openmeteo");

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
    const { startTime } = periodMap[key][0];
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
        combinedPeriod.canonDate = formatDate(period.startTime);
        combinedPeriod.temperature = temperature;
        combinedPeriod.icon = icon;
        combinedPeriod.humidity = relativeHumidity.value;
        combinedPeriod.precipitation = probabilityOfPrecipitation.value;
        return;
      }

      if (i === 0) {
        combinedPeriod.canonDate = formatDate(period.startTime);
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

async function getAstralForecast(lat, lng) {
  const response = await fetch(
    `https://api.sunrisesunset.io/json?lat=${lat}&lng=${lng}`
  );
  const result = await response.json();
  return result.results;
}

async function getOpenMeteoForecast(lat, lng) {
  const params = {
    latitude: lat,
    longitude: lng,
    hourly: [
      "apparent_temperature",
      "cloud_cover",
      "visibility",
      "uv_index",
      "freezing_level_height",
      "sunshine_duration",
    ],
    timezone: "America/Los_Angeles",
    temperature_unit: "fahrenheit",
  };
  const url = "https://api.open-meteo.com/v1/forecast";
  const responses = await fetchWeatherApi(url, params);

  // Helper function to form time ranges
  const range = (start, stop, step) =>
    Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

  // Process first location. Add a for-loop for multiple locations or weather models
  const response = responses[0];

  // Attributes for timezone and location
  const utcOffsetSeconds = 0;
  console.log("utcOffsetSeconds", utcOffsetSeconds);
  const hourly = response.hourly();

  // Note: The order of weather variables in the URL query and the indices below need to match!
  const weatherData = {
    hourly: {
      time: range(
        Number(hourly.time()),
        Number(hourly.timeEnd()),
        hourly.interval()
      ).map((t) => new Date((t + utcOffsetSeconds) * 1000)),
      apparentTemperature: hourly.variables(0).valuesArray(),
      cloudCover: hourly.variables(1).valuesArray(),
      visibility: hourly.variables(2).valuesArray(),
      uvIndex: hourly.variables(3).valuesArray(),
      freezingLevelHeight: hourly.variables(4).valuesArray(),
      sunshineDuration: hourly.variables(5).valuesArray(),
    },
  };

  return weatherData;
}

async function getHourlyForecast(url) {
  const response = await fetch(url);
  const result = await response.json();
  const { periods } = result?.properties;
  const newPeriods = createLocalImgUrls(periods);
  newPeriods.shift();
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

function formatDate(dateString) {
  const date = new Date(dateString);

  // Get the full month name
  const month = date.toLocaleString("default", { month: "long" });

  // Extract the day of the month
  const day = date.getDate();

  // Add the ordinal suffix
  const suffix = getOrdinalSuffix(day);

  // Construct the final formatted string
  const formattedDate = `${month} ${day}${suffix}`;

  return formattedDate;
}

function getOrdinalSuffix(day) {
  if (day >= 11 && day <= 13) {
    return "th";
  }
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}

function combineForecasts(nwsForecast, openMeteoForecast) {
  console.log("\n \n \n");

  for (let i = 0; i < nwsForecast.length; i++) {
    const { hourly } = openMeteoForecast;
    const {
      apparentTemperature,
      cloudCover,
      freezingLevelHeight,
      sunshineDuration,
      uvIndex,
      visibility,
      time,
    } = hourly;

    console.log(
      new Date(nwsForecast[i].startTime).toLocaleString("en-US", {
        timeZone: "America/Los_Angeles",
      }),
      nwsForecast[i].temperature,
      Math.round(apparentTemperature[i]),
      new Date(time[i]).toLocaleString("en-US", {
        timeZone: "America/Los_Angeles",
      }),
      nwsForecast[i].startTime === time[i]
    );

    let newPeriod = {
      ...nwsForecast[i],
      apparentTemperature: apparentTemperature[i],
      cloudCover: cloudCover[i],
      freezingLevelHeight: freezingLevelHeight[i],
      sunshineDuration: sunshineDuration[i],
      uvIndex: uvIndex[i],
      visibility: visibility[i],
    };

    nwsForecast[i] = newPeriod;
  }

  return nwsForecast;
}

module.exports = {
  getWeeklyForecast,
  getHourlyForecast,
  getAstralForecast,
  getOpenMeteoForecast,
  parseForecastDetails,
  getForecastRegion,
  parseCoordinates,
  combineForecasts,
};
