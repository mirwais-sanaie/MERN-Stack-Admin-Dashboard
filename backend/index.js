const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");

dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cors());

const PORT = process.env.PORT || 5000;
app.get("/api", (req, res) => {
  res.json({ message: "Hello from the backend!" });
});
