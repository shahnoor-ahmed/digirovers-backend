const Exceldata = require("../model/model");
const xlsx = require('xlsx');

const createExcel = async (req, res) => {
  try {
    const workbook = xlsx.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0];
    const jsonData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
    // Exceldata.insertMany(jsonData);
    console.log(jsonData);
    for (let i = 0; i < jsonData.length; i++) {
      let name="";
      let email="";
      let city="";
      let mobile="";
      let salary="";
      let dob="";
      let company="";
      let country="";
      let pinCode="";
      
      if(jsonData[i]["name"]!=null){
        name=jsonData[i]["name"];
      }

      if(jsonData[i]["email"]!=null){
        email=jsonData[i]["email"];
      }
      
      if(jsonData[i]["city"]!=null){
        city=jsonData[i]["city"];
      }
    
      
      if(jsonData[i]["mobile"]!=null){
        mobile=jsonData[i]["mobile"];
      }
      
      if(jsonData[i]["salary"]!=null){
        salary=jsonData[i]["salary"];
      }
      
      if(jsonData[i]["dob"]!=null){
        dob=jsonData[i]["dob"];
      }
      
      if(jsonData[i]["company"]!=null){
        company=jsonData[i]["company"];
      }
      
      if(jsonData[i]["country"]!=null){
        country=jsonData[i]["country"];
      }
      
      if(jsonData[i]["pinCode"]!=null){
        pinCode=jsonData[i]["pinCode"];
      }
      if(mobile!=''||email!=''){
        Exceldata.create({

          name:name,
          email:email,
          city:city,
          mobile:mobile,
          salary:salary,
          dob:dob,
          company:company,
          pinCode:pinCode,
          country:country,
          rebuttal:"",
          
  
        });
      }
      
    }

    //   // console.log(jsonData[i]["city"]);
    //   // console.log(jsonData[i]["email"]);
    //   // console.log(jsonData[i]["mobil  e"]);
      
      


    //   // const existingRecord = await Exceldata.findOne({ mobile });

    //   // if (existingRecord) {
    //   //   await Exceldata.updateOne({ mobile }, { $set: { rebuttal: data.rebuttal } });
    //   // } else {
    //   //   await Exceldata.create({ mobile, ...data });
    //   // }
    // }

    res.status(200).json({
      Total: jsonData.length,
      msg: "Fetched the excel data successfully",
      data: jsonData
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
}


const editRebuttal = async (req, res) => {
  try {
    const workbook = xlsx.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0];
    const jsonData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
    // Exceldata.insertMany(jsonData);
    console.log(jsonData);
    for (let i = 0; i < jsonData.length; i++) {
      let rebuttal="";
      // let email="";
      let mobile="";
      
      if(jsonData[i]["rebuttal"]!=null){
        rebuttal=jsonData[i]["rebuttal"];
      }

            
      if(jsonData[i]["mobile"]!=null){
        mobile=jsonData[i]["mobile"];
        let existingRecord = await Exceldata.findOne({ mobile });
        await Exceldata.updateOne({ mobile }, { $set: { rebuttal: rebuttal } });
        console.log(existingRecord);
      }

            
      // if(jsonData[i]["mobile"]!=null){
      //   mobile=jsonData[i]["mobile"];
      // }

      
      // Exceldata.create({

      //   name:name,
      //   email:jsonData[i]["email"],
      //   city:jsonData[i]["city"],
      //   mobile:mobile,
      //   salary:salary,
      //   dob:dob,
      //   company:company,
      //   pinCode:pinCode,
      //   country:country,
      //   rebuttal:"",
        

      // });
    }

    //   // console.log(jsonData[i]["city"]);
    //   // console.log(jsonData[i]["email"]);
    //   // console.log(jsonData[i]["mobil  e"]);
      
      


    //   // const existingRecord = await Exceldata.findOne({ mobile });

    //   // if (existingRecord) {
    //   //   await Exceldata.updateOne({ mobile }, { $set: { rebuttal: data.rebuttal } });
    //   // } else {
    //   //   await Exceldata.create({ mobile, ...data });
    //   // }
    // }

    res.status(200).json({
      Total: jsonData.length,
      msg: "Fetched the excel data successfully",
      data: jsonData
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
}


const getAllData = async (req, res) => {
  try {
    const query = {};
    console.log(req.query.city);
    if (req.query.city) {
      query.city = req.query.city;
    }

    if (req.query.state) {
      query.state = req.query.state;
    }
    if (req.query.country) {
      query.country = req.query.country;
    }
    
    if (req.query.pinCode) {
      query.pinCode = req.query.pinCode;
    }
    
    if (req.query.rebuttal) {
      query.rebuttal = req.query.rebuttal;
    }

    const data = await Exceldata.find(query);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}


const getAllCity = async (req, res) => {
  try {
    
    

    const data = await Exceldata.distinct("city");
    res.json(data);
  } catch (error) {
    res.status(500).json({ error:error });
  }
}


const getAllPinCode = async (req, res) => {
  try {
    
    

    const data = await Exceldata.distinct("pinCode");
    res.json(data);
  } catch (error) {
    res.status(500).json({ error:error });
  }
}

const getAllCountry = async (req, res) => {
  try {
    
    

    const data = await Exceldata.distinct("country", { "country" : { $nin : ["", null] } });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error:error });
  }
}

const getAllRebuttal = async (req, res) => {
  try {
    
    

    const data = await Exceldata.distinct("rebuttal", { "rebuttal" : { $nin : ["", null] } });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error:error });
  }
}



const getByIdData = async (req, res) => {
    try {
        const Id = req.params.id;
        const user = await Exceldata.findById(Id);

        if (!user) {
            return res.status(404).json({ status: 404, message: "User not found" });
        }

        res.json({ status: 200, message: "Data Get Successfully", data: user });
    } catch (error) {
        res.status(500).json({ status: 500, message: error.message });
    }
};

const UpdateData = async (req, res) => {
  try {
      const Id = req.params.id;
      const user = await Exceldata.findByIdAndUpdate(Id);

      if (!user) {
          return res.status(404).json({ status: 404, message: "User not found" });
      }

      res.json({ status: 200, message: "Data Updated Successfully", data: user });
  } catch (error) {
      res.status(500).json({ status: 500, message: error.message });
  }
};

const deleteAllData = async (req, res) => {
  try {
    const deletedCount = await Exceldata.deleteMany({});
    res.json({ status: 200, message: `${deletedCount.length} documents deleted successfully` });
  } catch (error) {
    res.json({ status: 500, message: error.message });
  }
};



module.exports = {
    createExcel,
    getAllData,
    getByIdData,
    deleteAllData,
    UpdateData,
    editRebuttal,
    getAllCity,
    getAllPinCode,
    getAllCountry,
    getAllRebuttal
}