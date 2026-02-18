const mongoose = require("mongoose")

function connectToDb() {
  mongoose
    .connect(process.env.mongo_URI)
    .then(() => {
      console.log("Connect to DB");
    });
}


module.exports = connectToDb;
