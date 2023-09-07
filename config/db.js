const mongoose = require("mongoose");
mongoose.set('strictQuery', false)
const DBConnect = () => {
  try {
    const conn = mongoose.connect(
      "mongodb+srv://hhhh7777:8BJTPc7ibbk7k9g@cluster0.bzp21vp.mongodb.net/?retryWrites=true&w=majority",
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