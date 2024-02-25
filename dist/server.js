"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_handlebars_1 = require("express-handlebars");
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use(express_1.default.json());
app.use(body_parser_1.default.json({ limit: "50mb" }));
app.use(body_parser_1.default.urlencoded({ limit: "50mb", extended: true }));
// app.use(express.static("public"));
app.engine("hbs", (0, express_handlebars_1.engine)({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", "hbs");
app.set("views", __dirname + "/views");
app.get("/", (req, res) => {
    res.render("layouts/main", {
        title: "My test page ayy lmao",
        message: "Welcome brothers",
    });
});
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
