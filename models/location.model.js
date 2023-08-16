const mongoose = require("mongoose");

/**
 * Creating a schema for the location model.
 */

const locationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: [true, "Location name is required."],
    },
    country: {
      type: String,
      required: [true, "Country is required."],
    },
    image: {
      type: {
        url: String,
        bytes: Number,
        width: Number,
        height: Number,
        mimeType: String,
        assetId: String,
        publicId: String,
      },
      required: [true, "Image is required."],
    },
    hotels: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hotel",
      },
    ],
  },
  {
    timestamps: true,
  }
);

/**
 * Exporting the location model.
 */
const Location = mongoose.model("Location", locationSchema);
module.exports = Location;
