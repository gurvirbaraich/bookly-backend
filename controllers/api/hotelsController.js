const Hotel = require("../../models/hotel.model");
const isDeepFalse = require("../../utils/isDeepFalse");

class HotelsController {
  /**
   * Retrieve and send the list of all the hotels.
   */
  async getHotels(req, res, next) {
    try {
      res.json(await Hotel.find());
    } catch (error) {
      next(error.message);
    }
  }

  /**
   * Create a new hotel and adds it to the database.
   */
  createHotel(req, res, next) {
    try {
      const {
        name,
        description,
        rating,
        price,
        image,
        currentPrice,
        coords,
        address,
      } = req.body;

      if (
        isDeepFalse(coords?.lat, coords?.lng) ||
        isDeepFalse(name, description, rating, price, address, image)
      ) {
        throw new Error(
          "'name', 'description', 'image', 'rating', 'price', 'coords.lat', 'coords.lng' and 'address' fields are required."
        );
      }

      Hotel.create({
        name,
        description,
        rating,
        price,
        currentPrice,
        image,
        coords,
        address,
      }).then((hotel) => res.json(hotel));
    } catch (error) {
      next(error.message);
    }
  }

  /**
   * Find and update the hotel in the database.
   */
  async updateHotel(req, res, next) {
    try {
      const { id } = req.params;

      if (isDeepFalse(id)) {
        throw new Error("Bad Request: missing 'id' field.");
      }

      const updated = await Hotel.findOneAndUpdate({ _id: id }, req.body, {
        new: true,
      });

      res.json(updated);
    } catch (error) {
      next(error.message);
    }
  }

  /**
   * Delete the hotel from the database.
   */
  async deleteHotel(req, res, next) {
    try {
      const { id } = req.params;

      if (isDeepFalse(id)) {
        throw new Error("Bad Request: missing 'id' field.");
      }

      await Hotel.findOneAndDelete({ _id: id });

      res.status(204).send();
    } catch (error) {
      next(error.message);
    }
  }
}

module.exports = new HotelsController();
