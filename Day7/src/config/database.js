const mongoose = require("mongoose")

function connectToDb() {
  mongoose
    .connect(
      "mongodb+srv://shivam666prajapati_db_user:CJrUpSWs3ImUkj7O@cluster0.di8le4n.mongodb.net/day-7",
    )
    .then(() => {
      console.log("Connect to DB");
    });
}


module.exports = connectToDb;
