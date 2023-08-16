const { uploader } = require("../../configurations/cloudinary");
const Location = require("../../models/location.model");
const autoDefault = require("../../utils/autoDefault");
const isDeepFalse = require("../../utils/isDeepFalse");

class LocationController {
  /**
   * Retrieve and send the list of all the locations.
   */
  async getLocations(req, res, next) {
    try {
      res.json(await Location.find());
    } catch (error) {
      next(error.message);
    }
  }

  /**
   * Create a new location.
   */
  async createLocation(req, res, next) {
    try {
      const { name, country, hotels, image } = req.body;

      if (isDeepFalse(name, country, image)) {
        throw new Error("Location must contain 'name', 'country' and 'image' fields.");
      }

      const {
        asset_id,
        public_id,
        width,
        height,
        format,
        resource_type,
        bytes,
        secure_url,
      } = await uploader.upload(image);

      const location = await Location.create({
        name,
        country,
        image: {
          assetId: asset_id,
          publicId: public_id,
          width,
          height,
          mimeType: `${resource_type}/${format}`,
          bytes,
          url: secure_url,
        },
        hotels: autoDefault(hotels),
      });

      res.send(location);
    } catch (error) {
      if (error.message) {
        next(error.message);
      }

      next(error);
    }
  }
}

module.exports = new LocationController();
