const locationController = require("../controllers/api/locationController");

/**
 * Importing the router from express
 */
const locationRouter = require("express").Router();

locationRouter.get("/get", locationController.getLocations);
locationRouter.post("/create", locationController.createLocation);

// Exporting the location router.
module.exports = locationRouter;
