/**
 * Importing the router from expressjs
 */
const userRouter = require("express").Router();
const apiController = require("../controllers/apiController");

// POST
userRouter.post("/auth/signup", apiController.users.signup);
userRouter.post("/user/book/:id", apiController.users.bookRoom);

module.exports = userRouter;