import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.static("public"));

app.get("/clicked", (req, res) => {
  res.send(`<h1>Ayy lmao</h1>`);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
