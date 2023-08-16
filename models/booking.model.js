const mongoose = require("mongoose");

/**
 * Creating a schema for the booking model.
 */

const bookingSchema = new mongoose.Schema({
  hotelID: [{ type: mongoose.Schema.Types.ObjectId, ref: "Hotel" }],
});

/**
 * Exporting the booking model.
 */
const Booking = mongoose.model("Booking", bookingSchema);
module.exports = Booking;
