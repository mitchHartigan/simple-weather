export const testForecast = {
  "@context": [
    "https://geojson.org/geojson-ld/geojson-context.jsonld",
    {
      "@version": "1.1",
      wx: "https://api.weather.gov/ontology#",
      geo: "http://www.opengis.net/ont/geosparql#",
      unit: "http://codes.wmo.int/common/unit/",
      "@vocab": "https://api.weather.gov/ontology#",
    },
  ],
  type: "Feature",
  geometry: {
    type: "Polygon",
    coordinates: [
      [33.4860496, -117.647515],
      [33.463788900000004, -117.6430154],
      [33.467534900000004, -117.6163644],
      [33.489796000000005, -117.6208589],
    ],
  },
  properties: {
    updated: "2024-03-04T21:09:42+00:00",
    units: "us",
    forecastGenerator: "BaselineForecastGenerator",
    generatedAt: "2024-03-04T22:17:37+00:00",
    updateTime: "2024-03-04T21:09:42+00:00",
    validTimes: "2024-03-04T15:00:00+00:00/P7DT10H",
    elevation: {
      unitCode: "wmoUnit:m",
      value: 96.9264,
    },
    periods: [
      {
        number: 1,
        name: "This Afternoon",
        startTime: "2024-03-04T14:00:00-08:00",
        endTime: "2024-03-04T18:00:00-08:00",
        isDaytime: true,
        temperature: 61,
        temperatureUnit: "F",
        temperatureTrend: null,
        probabilityOfPrecipitation: {
          unitCode: "wmoUnit:percent",
          value: null,
        },
        dewpoint: {
          unitCode: "wmoUnit:degC",
          value: 9.444444444444445,
        },
        relativeHumidity: {
          unitCode: "wmoUnit:percent",
          value: 72,
        },
        windSpeed: "5 to 10 mph",
        windDirection: "W",
        icon: "https://api.weather.gov/icons/land/day/sct?size=medium",
        shortForecast: "Mostly Sunny",
        detailedForecast:
          "Mostly sunny, with a high near 61. West wind 5 to 10 mph.",
      },
      {
        number: 2,
        name: "Tonight",
        startTime: "2024-03-04T18:00:00-08:00",
        endTime: "2024-03-05T06:00:00-08:00",
        isDaytime: false,
        temperature: 48,
        temperatureUnit: "F",
        temperatureTrend: null,
        probabilityOfPrecipitation: {
          unitCode: "wmoUnit:percent",
          value: null,
        },
        dewpoint: {
          unitCode: "wmoUnit:degC",
          value: 8.333333333333334,
        },
        relativeHumidity: {
          unitCode: "wmoUnit:percent",
          value: 97,
        },
        windSpeed: "0 to 5 mph",
        windDirection: "E",
        icon: "https://api.weather.gov/icons/land/night/bkn?size=medium",
        shortForecast: "Mostly Cloudy",
        detailedForecast:
          "Mostly cloudy, with a low around 48. East wind 0 to 5 mph.",
      },
      {
        number: 3,
        name: "Tuesday",
        startTime: "2024-03-05T06:00:00-08:00",
        endTime: "2024-03-05T18:00:00-08:00",
        isDaytime: true,
        temperature: 63,
        temperatureUnit: "F",
        temperatureTrend: null,
        probabilityOfPrecipitation: {
          unitCode: "wmoUnit:percent",
          value: null,
        },
        dewpoint: {
          unitCode: "wmoUnit:degC",
          value: 11.11111111111111,
        },
        relativeHumidity: {
          unitCode: "wmoUnit:percent",
          value: 95,
        },
        windSpeed: "5 to 10 mph",
        windDirection: "S",
        icon: "https://api.weather.gov/icons/land/day/sct?size=medium",
        shortForecast: "Mostly Sunny",
        detailedForecast:
          "Mostly sunny, with a high near 63. South wind 5 to 10 mph.",
      },
      {
        number: 4,
        name: "Tuesday Night",
        startTime: "2024-03-05T18:00:00-08:00",
        endTime: "2024-03-06T06:00:00-08:00",
        isDaytime: false,
        temperature: 48,
        temperatureUnit: "F",
        temperatureTrend: null,
        probabilityOfPrecipitation: {
          unitCode: "wmoUnit:percent",
          value: 20,
        },
        dewpoint: {
          unitCode: "wmoUnit:degC",
          value: 10,
        },
        relativeHumidity: {
          unitCode: "wmoUnit:percent",
          value: 100,
        },
        windSpeed: "5 mph",
        windDirection: "N",
        icon:
          "https://api.weather.gov/icons/land/night/bkn/rain_showers,20?size=medium",
        shortForecast: "Mostly Cloudy then Slight Chance Rain Showers",
        detailedForecast:
          "A slight chance of rain showers after 4am. Mostly cloudy, with a low around 48. North wind around 5 mph. Chance of precipitation is 20%.",
      },
      {
        number: 5,
        name: "Wednesday",
        startTime: "2024-03-06T06:00:00-08:00",
        endTime: "2024-03-06T18:00:00-08:00",
        isDaytime: true,
        temperature: 62,
        temperatureUnit: "F",
        temperatureTrend: null,
        probabilityOfPrecipitation: {
          unitCode: "wmoUnit:percent",
          value: 40,
        },
        dewpoint: {
          unitCode: "wmoUnit:degC",
          value: 11.666666666666666,
        },
        relativeHumidity: {
          unitCode: "wmoUnit:percent",
          value: 100,
        },
        windSpeed: "5 to 10 mph",
        windDirection: "S",
        icon:
          "https://api.weather.gov/icons/land/day/rain_showers,30/tsra_sct,40?size=medium",
        shortForecast: "Chance Rain Showers",
        detailedForecast:
          "A chance of rain showers before 4pm, then a chance of showers and thunderstorms. Partly sunny, with a high near 62. South wind 5 to 10 mph. Chance of precipitation is 40%. New rainfall amounts between a tenth and quarter of an inch possible.",
      },
      {
        number: 6,
        name: "Wednesday Night",
        startTime: "2024-03-06T18:00:00-08:00",
        endTime: "2024-03-07T06:00:00-08:00",
        isDaytime: false,
        temperature: 50,
        temperatureUnit: "F",
        temperatureTrend: null,
        probabilityOfPrecipitation: {
          unitCode: "wmoUnit:percent",
          value: 40,
        },
        dewpoint: {
          unitCode: "wmoUnit:degC",
          value: 11.11111111111111,
        },
        relativeHumidity: {
          unitCode: "wmoUnit:percent",
          value: 97,
        },
        windSpeed: "5 mph",
        windDirection: "W",
        icon:
          "https://api.weather.gov/icons/land/night/tsra_sct,40?size=medium",
        shortForecast: "Chance Showers And Thunderstorms",
        detailedForecast:
          "A chance of showers and thunderstorms. Mostly cloudy, with a low around 50. Chance of precipitation is 40%.",
      },
      {
        number: 7,
        name: "Thursday",
        startTime: "2024-03-07T06:00:00-08:00",
        endTime: "2024-03-07T18:00:00-08:00",
        isDaytime: true,
        temperature: 61,
        temperatureUnit: "F",
        temperatureTrend: null,
        probabilityOfPrecipitation: {
          unitCode: "wmoUnit:percent",
          value: 20,
        },
        dewpoint: {
          unitCode: "wmoUnit:degC",
          value: 12.222222222222221,
        },
        relativeHumidity: {
          unitCode: "wmoUnit:percent",
          value: 99,
        },
        windSpeed: "5 to 10 mph",
        windDirection: "W",
        icon:
          "https://api.weather.gov/icons/land/day/rain_showers,20/sct?size=medium",
        shortForecast: "Slight Chance Rain Showers then Mostly Sunny",
        detailedForecast:
          "A slight chance of rain showers before 10am. Mostly sunny, with a high near 61. Chance of precipitation is 20%.",
      },
      {
        number: 8,
        name: "Thursday Night",
        startTime: "2024-03-07T18:00:00-08:00",
        endTime: "2024-03-08T06:00:00-08:00",
        isDaytime: false,
        temperature: 48,
        temperatureUnit: "F",
        temperatureTrend: null,
        probabilityOfPrecipitation: {
          unitCode: "wmoUnit:percent",
          value: null,
        },
        dewpoint: {
          unitCode: "wmoUnit:degC",
          value: 10,
        },
        relativeHumidity: {
          unitCode: "wmoUnit:percent",
          value: 96,
        },
        windSpeed: "5 to 10 mph",
        windDirection: "SE",
        icon: "https://api.weather.gov/icons/land/night/sct?size=medium",
        shortForecast: "Partly Cloudy",
        detailedForecast: "Partly cloudy, with a low around 48.",
      },
      {
        number: 9,
        name: "Friday",
        startTime: "2024-03-08T06:00:00-08:00",
        endTime: "2024-03-08T18:00:00-08:00",
        isDaytime: true,
        temperature: 64,
        temperatureUnit: "F",
        temperatureTrend: null,
        probabilityOfPrecipitation: {
          unitCode: "wmoUnit:percent",
          value: null,
        },
        dewpoint: {
          unitCode: "wmoUnit:degC",
          value: 11.666666666666666,
        },
        relativeHumidity: {
          unitCode: "wmoUnit:percent",
          value: 96,
        },
        windSpeed: "5 to 10 mph",
        windDirection: "S",
        icon: "https://api.weather.gov/icons/land/day/few?size=medium",
        shortForecast: "Sunny",
        detailedForecast: "Sunny, with a high near 64.",
      },
      {
        number: 10,
        name: "Friday Night",
        startTime: "2024-03-08T18:00:00-08:00",
        endTime: "2024-03-09T06:00:00-08:00",
        isDaytime: false,
        temperature: 49,
        temperatureUnit: "F",
        temperatureTrend: null,
        probabilityOfPrecipitation: {
          unitCode: "wmoUnit:percent",
          value: null,
        },
        dewpoint: {
          unitCode: "wmoUnit:degC",
          value: 10.555555555555555,
        },
        relativeHumidity: {
          unitCode: "wmoUnit:percent",
          value: 91,
        },
        windSpeed: "5 to 10 mph",
        windDirection: "N",
        icon: "https://api.weather.gov/icons/land/night/few?size=medium",
        shortForecast: "Mostly Clear",
        detailedForecast: "Mostly clear, with a low around 49.",
      },
      {
        number: 11,
        name: "Saturday",
        startTime: "2024-03-09T06:00:00-08:00",
        endTime: "2024-03-09T18:00:00-08:00",
        isDaytime: true,
        temperature: 66,
        temperatureUnit: "F",
        temperatureTrend: null,
        probabilityOfPrecipitation: {
          unitCode: "wmoUnit:percent",
          value: null,
        },
        dewpoint: {
          unitCode: "wmoUnit:degC",
          value: 12.777777777777779,
        },
        relativeHumidity: {
          unitCode: "wmoUnit:percent",
          value: 90,
        },
        windSpeed: "5 to 10 mph",
        windDirection: "SW",
        icon: "https://api.weather.gov/icons/land/day/sct?size=medium",
        shortForecast: "Mostly Sunny",
        detailedForecast: "Mostly sunny, with a high near 66.",
      },
      {
        number: 12,
        name: "Saturday Night",
        startTime: "2024-03-09T18:00:00-08:00",
        endTime: "2024-03-10T06:00:00-07:00",
        isDaytime: false,
        temperature: 49,
        temperatureUnit: "F",
        temperatureTrend: null,
        probabilityOfPrecipitation: {
          unitCode: "wmoUnit:percent",
          value: null,
        },
        dewpoint: {
          unitCode: "wmoUnit:degC",
          value: 11.666666666666666,
        },
        relativeHumidity: {
          unitCode: "wmoUnit:percent",
          value: 94,
        },
        windSpeed: "5 to 10 mph",
        windDirection: "N",
        icon: "https://api.weather.gov/icons/land/night/sct?size=medium",
        shortForecast: "Partly Cloudy",
        detailedForecast: "Partly cloudy, with a low around 49.",
      },
      {
        number: 13,
        name: "Sunday",
        startTime: "2024-03-10T06:00:00-07:00",
        endTime: "2024-03-10T18:00:00-07:00",
        isDaytime: true,
        temperature: 65,
        temperatureUnit: "F",
        temperatureTrend: null,
        probabilityOfPrecipitation: {
          unitCode: "wmoUnit:percent",
          value: null,
        },
        dewpoint: {
          unitCode: "wmoUnit:degC",
          value: 11.666666666666666,
        },
        relativeHumidity: {
          unitCode: "wmoUnit:percent",
          value: 95,
        },
        windSpeed: "5 to 10 mph",
        windDirection: "SW",
        icon: "https://api.weather.gov/icons/land/day/sct?size=medium",
        shortForecast: "Mostly Sunny",
        detailedForecast: "Mostly sunny, with a high near 65.",
      },
      {
        number: 14,
        name: "Sunday Night",
        startTime: "2024-03-10T18:00:00-07:00",
        endTime: "2024-03-11T06:00:00-07:00",
        isDaytime: false,
        temperature: 49,
        temperatureUnit: "F",
        temperatureTrend: null,
        probabilityOfPrecipitation: {
          unitCode: "wmoUnit:percent",
          value: null,
        },
        dewpoint: {
          unitCode: "wmoUnit:degC",
          value: 11.11111111111111,
        },
        relativeHumidity: {
          unitCode: "wmoUnit:percent",
          value: 98,
        },
        windSpeed: "5 to 10 mph",
        windDirection: "NW",
        icon: "https://api.weather.gov/icons/land/night/bkn?size=medium",
        shortForecast: "Mostly Cloudy",
        detailedForecast: "Mostly cloudy, with a low around 49.",
      },
    ],
  },
};