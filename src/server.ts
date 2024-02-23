import express from "express";
import path from "path";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static("public"));

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
