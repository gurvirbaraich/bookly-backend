/**
 * Importing required modules.
 */
const express = require("express");
const cors = require("cors");
const app = express();

/**
 * Importing custom made utility functions.
 */
const connectMongoDB = require("./utils/connectMongoDB");
const loadEnvironmentVariables = require("./utils/loadEnvironmentVariables");

/**
 * Importing all the routers.
 */
const userRouter = require("./routes/user.routes");
const hotelRouter = require("./routes/hotel.routes");
const locationRouter = require("./routes/location.routes");
const { configureCloudinary } = require("./configurations/cloudinary");

/**
 * Loading the environment variables into the application.
 */
loadEnvironmentVariables();

/**
 * * Connecting to the MongoDB database.
 * On connection, Listening on port 4000.
 */
connectMongoDB()
  .then(function (host) {
    configureCloudinary();

    app.listen(process.env.PORT || 4000, () => {
      console.log(`Connected to MongoDB: ${host}`);
      console.log("Server running on PORT: http://localhost:4000/");
    });
  })
  .catch(function (error) {
    console.log(error.message);
  });

/**
 * Enabling requests from certain domains to the server.
 */
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["*"],
  })
);

/**
 * Enabling JSON submissions on the server.
 */
app.use(express.json());

/**
 * Using the routes from different files.
 */
app.use("/api", userRouter);
app.use("/api/hotels", hotelRouter);
app.use("/api/locations", locationRouter);
