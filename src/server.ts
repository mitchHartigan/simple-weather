import express from "express";
import bodyParser from "body-parser";

import {
  getForecastRegion,
  getWeeklyForecast,
  parseCoordinates,
} from "./utils";

import cors from "cors";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());
app.use(express.static("public-vite"));

app.get("/forecast/:coordinateStr", async (req, res) => {
  console.log("forecast hit");
  const { latitude, longitude } = parseCoordinates(req.params.coordinateStr);
  const region = await getForecastRegion(latitude, longitude);
  const forecast = await getWeeklyForecast(region);
  res.json(forecast);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
