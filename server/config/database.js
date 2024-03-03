const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config();
const mongoUrl = process.env.MONGO_URL;

exports.connect = () => { 
  mongoose
    .connect(mongoUrl)
    .then(() => console.log("DB connected successfully."))
    .catch((error) => {
      console.log("DB connection failed.");
      console.log(error);
      process.exit(1);
    });
};
