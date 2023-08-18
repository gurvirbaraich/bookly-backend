/**
 * Importing the router from expressjs
*/
const hotelRouter = require("express").Router();
const apiController = require("../controllers/apiController");

// GET
hotelRouter.get("/", apiController.hotels.getHotels);
hotelRouter.get("/:location", apiController.hotels.getHotels);

// POST
hotelRouter.post("/", apiController.hotels.createHotel);

// PUT
hotelRouter.put("/", apiController.hotels.updateHotel);
hotelRouter.put("/:id", apiController.hotels.updateHotel);

// DELETE
hotelRouter.delete("/", apiController.hotels.deleteHotel);
hotelRouter.delete("/:id", apiController.hotels.deleteHotel);

module.exports = hotelRouter;
