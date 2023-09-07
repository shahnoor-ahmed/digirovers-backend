const mongoose = require("mongoose");

const ExcelSchema = new mongoose.Schema({
  name: {type:String,
    optional: ''},
  email:{type:String,
    optional: ''},
  city: {type:String,
    optional: ''},
  mobile: {type:String,
    optional: ''},
  salary: {type:String,
    optional: ''},
  dob: {type:String,
    optional: ''},
  company: {type:String,
    optional: ''},
  country: {type:String,
    optional: ''},
  pinCode: {type:String,
    optional: ''},
  rebuttal:{type:String,
    optional: ''},
},{timestamps:true});

module.exports = mongoose.model("Exceldata", ExcelSchema);
