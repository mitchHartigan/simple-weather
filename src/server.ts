import express from "express";
import bodyParser from "body-parser";
import { engine } from "express-handlebars";

import {
  getForecastRegion,
  getWeeklyForecast,
  parseCoordinates,
} from "./utils";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.static("public"));

app.engine("hbs", engine({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", "hbs");
app.set("views", __dirname + "/views");

app.get("/clicked", (req, res) => {
  res.render("layouts/main", {
    title: "My test page ayy lmao",
    message: "Welcome brothers",
  });
});

app.get("/greetings", (req, res) => {
  res.render("layouts/greetings");
});

app.get("/forecast/:coordinateStr", async (req, res) => {
  const { latitude, longitude } = parseCoordinates(req.params.coordinateStr);
  const region = await getForecastRegion(latitude, longitude);
  const forecast = await getWeeklyForecast(region);
  res.send(forecast);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
