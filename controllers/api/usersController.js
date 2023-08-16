const bcrypt = require("bcryptjs");
const isEmail = require("../../utils/isEmail");
const User = require("../../models/user.model");
const isDeepFalse = require("../../utils/isDeepFalse");
const Booking = require("../../models/booking.model");
const Hotel = require("../../models/hotel.model");

class UserController {
  /**
   * Create a new user.
   */
  signup(req, res, next) {  
    try {
      const { email, password } = req.body;

      if (isDeepFalse(email, password)) {
        throw new Error("'email' and 'password' fields are required.");
      }

      if (!isEmail(email)) {
        throw new Error("'email' field must be a valid email.");
      }

      const username = email.split("@")[0];
      const hashedPassword = bcrypt.hashSync(password, process.env.SALT);

      User.create({ username, email, password: hashedPassword }).then((user) =>
        res.status(201).json(user)
      );
    } catch (error) {
      next(error);
    }
  }

  /**
   * Book a hotel.
   */
  async bookRoom(req, res, next) {
    try {
      const { id } = req.params;

      // Get the hotel
      const hotel = await Hotel.findById(req.body.id);

      if (hotel == null) throw new Error("Hotel not found.");

      // Create a booking
      const booking = await Booking.create({
        hotelID: hotel,
      });

      const user = await User.findByIdAndUpdate(
        id,
        {
          $push: {
            bookings: booking._id,
          },
        },
        { new: true }
      );

      res.json({ bookings: user.bookings });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();
