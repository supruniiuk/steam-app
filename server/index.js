const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const PORT = process.env.PORT || 8080;
const DB_URL = process.env.DB_URL;
const app = express();
const router = require("./routes/routes");

const errorMiddleware = require("./middleware/errorMiddleware");

app.use(cors());
app.use(express.json());

app.use("/api", router);
app.use(errorMiddleware);

async function start() {
  console.log(process.env.PORT);
  await mongoose.connect(DB_URL, {
    useNewUrlParser: true,
  });
  app.listen(PORT, () => {
    console.log(`Server startes on port ${PORT}`);
  });
}

start();
