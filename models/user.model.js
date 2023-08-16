const mongoose = require("mongoose");

/**
 * Creating a schema for the user model.
 */

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "A user must have a username"],
    unique: [true, "A username must uniquely identify a user"],
  },
  email: {
    type: String,
    required: [true, "A user must have an email"],
    unique: [true, "Email already taken!"],
  },
  password: {
    min: 8,
    type: String,
    required: [true, "Please enter a password"],
  },
  bookings: [
    {
      ref: "Booking",
      type: mongoose.Schema.Types.ObjectId,
    }
  ]
});

/**
 * Exporting the user model.
 */
const User = mongoose.model("User", userSchema);
module.exports = User;