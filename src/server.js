const express = require("express");
const bodyParser = require("body-parser");

const {
  getForecastRegion,
  getWeeklyForecast,
  getHourlyForecast,
  getAstralForecast,
  parseCoordinates,
  parseForecastDetails,
  getOpenMeteoForecast,
  combineForecasts,
} = require("./utils");

const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());
app.use(express.static("public"));

app.get("/forecast/:coordinateStr", async (req, res) => {
  console.log("forecast hit");
  // first request to get the forecast region from the lat/long coordinates.
  // request returns two endpoints for the hourly and weekly forecast for the requested region.
  console.log(req.params.coordinateStr);
  const { lat, lng } = parseCoordinates(req.params.coordinateStr);
  const { dailyEndpoint, hourlyEndpoint } = await getForecastRegion(lat, lng);

  // make requests to the two endpoints.
  const weeklyForecast = await getWeeklyForecast(dailyEndpoint);
  const nwsForecast = await getHourlyForecast(hourlyEndpoint);
  const astralForecast = await getAstralForecast(lat, lng);
  const openMeteoForecast = await getOpenMeteoForecast(lat, lng);

  const hourlyForecast = combineForecasts(nwsForecast, openMeteoForecast);

  const { dailyForecast, details, coordinates } = parseForecastDetails(
    weeklyForecast,
    hourlyForecast
  );

  const forecast = {
    coordinates: { lat, lng },
    regionBounds: coordinates,
    details,
    dailyForecast,
    hourlyForecast,
    astralForecast,
    openMeteoForecast,
  };

  res.json(forecast);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
