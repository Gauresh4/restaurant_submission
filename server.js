const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const { PORT, DB_URL } = process.env;
const app = express();

app.use(express.json());
mongoose.connect(DB_URL);

const db = mongoose.connection;
db.on("error", () => {
  console.log("Error while connecting to DB");
});

db.once("open", () => {
  console.log("Connected to database");
});

require("./routes/restaurant.route")(app);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
