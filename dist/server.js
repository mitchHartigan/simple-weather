"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_handlebars_1 = require("express-handlebars");
const utils_1 = require("./utils");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use(express_1.default.json());
app.use(body_parser_1.default.json({ limit: "50mb" }));
app.use(body_parser_1.default.urlencoded({ limit: "50mb", extended: true }));
app.use((0, cors_1.default)());
app.use(express_1.default.static("public"));
app.engine("hbs", (0, express_handlebars_1.engine)({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", "hbs");
app.set("views", __dirname + "/views");
app.get("/dummy", (req, res) => {
    res.render("layouts/main", {
        message: "Handle time baby",
    });
});
app.get("/forecast/:coordinateStr", async (req, res) => {
    const { latitude, longitude } = (0, utils_1.parseCoordinates)(req.params.coordinateStr);
    const region = await (0, utils_1.getForecastRegion)(latitude, longitude);
    const forecast = await (0, utils_1.getWeeklyForecast)(region);
    const { periods } = forecast;
    res.json(forecast);
});
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
