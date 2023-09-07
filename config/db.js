const mongoose = require("mongoose");
mongoose.set('strictQuery', false)
const DBConnect = () => {
  try {
    const conn = mongoose.connect(
      "mongodb+srv://rishabhsachan8604:RakdFqKLlfrxM4M3@cluster0.ixr71ml.mongodb.net/uploadData",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    console.log("Database Connected Successfully");
  } catch (error) {
    console.log("Database error");
  }
};

module.exports = {
  DBConnect,
};