const express = require("express");
const bodyParser = require("body-parser");

const {
  getForecastRegion,
  getWeeklyForecast,
  parseCoordinates,
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
  const { latitude, longitude } = parseCoordinates(req.params.coordinateStr);
  const { dailyEndpoint, hourlyEndpoint } = await getForecastRegion(
    latitude,
    longitude
  );
  const dailyForecast = await getWeeklyForecast(dailyEndpoint);
  res.json(dailyForecast);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
