const mongoose = require("mongoose");

module.exports = function () {
  return new Promise(async function (resolve, reject) {
    try {
      const connectionRef = await mongoose.connect(process.env.MONGODB_URL);

      resolve(connectionRef.connection.host);
    } catch (error) {
      reject(error);
    }
  });
};
