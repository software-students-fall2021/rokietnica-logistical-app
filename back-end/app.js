// import and instantiate express
const express = require("express"); // CommonJS import style!
const axios = require("axios"); // middleware for making requests to APIs
const app = express(); // instantiate an Express object
const parseCSV = require("./parseCSV");

const fs = require("fs");


const stationData = require("./stations");

// allow CORS, so React app on port 3000 can make requests to Express server on port 4000
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
require("dotenv").config({ silent: true })
const mongoose = require("mongoose");
const db_url = process.env.MONGO_DB_URL;
mongoose.connect(db_url, () =>{
  console.log("DB connection state: " + mongoose.connection.readyState);
});
// route for HTTP GET requests to the root document
app.get("/", (req, res) => {
  res.send("Goodbye world!");
});

// proxy requests to/from an API
app.get("/apiCallTest", (req, res, next) => {
  axios
    .get("https://my.api.mockaroo.com/line0.json?key=57b58bf0")
    .then((apiResponse) => res.json(apiResponse.data)) // pass data along directly to client
    .catch((err) => next(err)); // pass any errors to express
});

app.get("/stationData", (req, res) => {
  
  axios
    .get("http://demo6882294.mockable.io/stations")
    .then(response=>{
      
      
    //stationData.parse(response.data);
    stationData.columns = response.data[0];
    stationData.stations = response.data;
    for(var i  = 0; i < stationData.stations.length;i++){
      var station = stationData.stations[i];
      station["Daytime Routes"] = station["Daytime Routes"].toString().split(" ");
    }
    
     res.json(stationData);
     
  })
  .catch(error=>{
    console.log(error);
    res.send(error);
  })
})

app.get("/station/:id", (req, res) => {
  const station = stationData.stations.filter(
    (st) => st["Station ID"] == req.params.id
  );
  res.json(station[0]);
});

module.exports = app;
