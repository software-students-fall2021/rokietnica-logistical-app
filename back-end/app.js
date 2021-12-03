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

require("dotenv").config({ silent: true });
const mongoose = require("mongoose");
const db_url = process.env.MONGO_DB_URL;
mongoose.connect(db_url, () => {
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

app.get("/stationData", (req, res, next) => {
  axios
    .get("http://demo6882294.mockable.io/stations")
    .then((response) => {
      //stationData.parse(response.data);
      stationData.columns = response.data[0];
      stationData.stations = response.data;
      for (var i = 0; i < stationData.stations.length; i++) {
        var station = stationData.stations[i];
        station["Daytime Routes"] = station["Daytime Routes"]
          .toString()
          .split(" ");
      }

      res.json(stationData);
    })
    .catch((error) => {
      console.log(error);
      next(error);
    });
});

app.get("/station/:id", (req, res, next) => {
  let endpoint = "http://localhost:5000/by-id/" + req.params.id;
  axios
    .get(endpoint)
    .then((response) => {
      const data = parseStation(response.data);
      console.log(data);
      res.json(data);
    })
    .catch((error) => {
      console.log(error);
      next(error);
    });
});

// utilities (move to another file later...)
function parseStation(data) {
  const dataObj = data.data[0];
  const parsed = {};

  parsed.id = dataObj.id;
  parsed.name = dataObj.name;
  parsed.updated = minutesAgo(data.updated);

  // create skeleton objects for traintimes when iterating later
  parsed.traintimes = {};
  parsed.routes = dataObj.routes.sort();
  parsed.routes.forEach((route) => {
    parsed.traintimes[route] = {
      uptown: [],
      downtown: [],
    };
  });

  for (const key of Object.keys(parsed.traintimes)) {
    parsed.traintimes[key].uptown = getTrains(key, dataObj.N);
    parsed.traintimes[key].downtown = getTrains(key, dataObj.S);
  }

  return parsed;
}

function minutesAway(datetimestr) {
  const now = new Date();
  const future = new Date(datetimestr);
  const diff = future.getTime() - now.getTime();
  return Math.floor(diff / 1000 / 60); // milliseconds to minutes, floored
}

function minutesAgo(datetimestr) {
  const now = new Date();
  const future = new Date(datetimestr);
  const diff = now.getTime() - future.getTime();
  return Math.round(diff / 1000 / 60); // milliseconds to minutes, floored
}

function getTrains(route, trains) {
  const filtered = trains.filter((entry) => entry.route == route);
  return filtered.map((entry) => {
    return minutesAway(entry.time);
  });
}

module.exports = app;
