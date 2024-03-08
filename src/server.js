const express = require("express");
const bodyParser = require("body-parser");

const {
  getForecastRegion,
  getWeeklyForecast,
  parseCoordinates,
  getHourlyForecast,
  parseForecastDetails,
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
  const hourlyForecast = await getHourlyForecast(hourlyEndpoint);

  const { dailyForecast, details, coordinates } =
    parseForecastDetails(weeklyForecast);

  const forecast = {
    coordinates: { lat, lng },
    regionBounds: coordinates,
    details,
    dailyForecast,
    hourlyForecast,
    astralForecast: {},
  };

  res.json(forecast);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
