const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const { PORT, DB_URL } = process.env;
const app = express();
// const serverConfig = require("./configs/server.config");
// const dbConfig = require("./configs/db.config");

app.use(express.json());
mongoose.connect(DB_URL);

const db = mongoose.connection;
db.on("error", () => {
  console.log("Error while connecting to DB");
});

db.once("open", () => {
  console.log("Connected to database");
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
