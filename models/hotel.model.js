const mongoose = require("mongoose");

/**
 * Creating a schema for the hotel model.
 */
const hotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A hotel must have a name!"],
  },
  description: {
    type: String,
    required: [true, "A hotel must have a description!"],
  },
  rating: {
    min: 0,
    max: 5,
    type: Number,
    required: [true, "A hotel must have a rating!"],
  },
  price: {
    type: Number,
    required: [true, "A hotel must have a price!"],
  },
  currentPrice: {
    type: Number,
  },
  address: {
    type: String,
    required: [true, "A hotel must have an address!"],
  },
  image: {
    type: String,
    required: [true, "A hotel must have an image!"],
  },
  coords: {
    lat: {
      type: Number,
      required: [true, "A hotel must have a latitude!"],
    },
    lng: {
      type: Number,
      required: [true, "A hotel must have a longitude!"],
    },
  },
});

/**
 * Exporting the hotel model.
 */
const Hotel = mongoose.model("Hotel", hotelSchema);
module.exports = Hotel;