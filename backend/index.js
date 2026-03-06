const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const connectDB = require("./data/db");
const salesRoute = require("./routes/salesRoutes");
const clientsRoute = require("./routes/clientsRoutes");
const managementRoute = require("./routes/managementRoutes");
const generalRoute = require("./routes/generalRoutes");

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
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("/api/v1", (req, res) => {
  res.json({ message: "Hello from the backend!" });
});

//connect to database
connectDB();

//routes
app.use("/api/v1/sales", salesRoute);
app.use("/api/v1/clients", clientsRoute);
app.use("/api/v1/management", managementRoute);
app.use("/api/v1/general", generalRoute);
