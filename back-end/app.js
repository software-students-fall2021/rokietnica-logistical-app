// import and instantiate express
const express = require("express"); // CommonJS import style!
const axios = require("axios"); // middleware for making requests to APIs
const app = express(); // instantiate an Express object
const fs = require("fs");

const API_DOMAIN = "http://localhost:5000";

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

// parse stations file
const stationsData = JSON.parse(
  fs.readFileSync("../MTAPI-master/data/stations.json").toString()
);
const stationIDs = Object.keys(stationsData);

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

// returns array of station objects, with id, name, and list of routes
app.get("/allStations", (req, res, next) => {
  const ids = stationIDs.join(",");
  const endpoint = API_DOMAIN + "/by-id/" + ids;
  axios
    .get(endpoint)
    .then((response) => {
      const data = response.data.data
        .filter((station) => station.routes.length > 0) // remove stations with no routes currently available
        .map((station) => {
          return {
            id: station.id,
            name: station.name,
            routes: station.routes.sort(),
          };
        });
      console.log(data);
      res.send(data);
    })
    .catch((error) => {
      console.log(error);
      next(error);
    });
});

app.get("/station/:id", (req, res, next) => {
  if (!stationIDs.includes(req.params.id)) {
    res.send("no station with specified id");
    return;
  }
  const endpoint = API_DOMAIN + "/by-id/" + req.params.id;
  axios
    .get(endpoint)
    .then((response) => {
      const data = parseStation(response.data.data[0]);
      console.log(data);
      res.json(data);
    })
    .catch((error) => {
      console.log(error);
      next(error);
    });
});

// utilities (move to another file later...)
function parseStation(station) {
  const parsed = {};

  parsed.id = station.id;
  parsed.name = station.name;
  parsed.last_update = minutesAgo(station.last_update);

  // create skeleton objects for traintimes when iterating later
  parsed.traintimes = {};
  parsed.routes = station.routes.sort();
  parsed.routes.forEach((route) => {
    parsed.traintimes[route] = {
      uptown: [],
      downtown: [],
    };
  });

  for (const key of Object.keys(parsed.traintimes)) {
    parsed.traintimes[key].uptown = getTrains(key, station.N);
    parsed.traintimes[key].downtown = getTrains(key, station.S);
  }

  return parsed;
}

function minutesAway(datetimestr) {
  const now = new Date();
  const future = new Date(datetimestr);
  const diff = future.getTime() - now.getTime();
  const minutes = Math.round(diff / 1000 / 60);

  // this shouldn't happen... hopefully not off by more an a minute
  if (minutes < 0) {
    let oneDecimal = Math.round(minutes * 10) / 10;
    console.log(
      `A train arrival time was calculated to be negative: ${oneDecimal} minutes`
    );
  }
  return minutes; // milliseconds to minutes
}

// can be used to show user when MTA data was last updated
function minutesAgo(datetimestr) {
  const now = new Date();
  const future = new Date(datetimestr);
  const diff = now.getTime() - future.getTime();
  return Math.round(diff / 1000 / 60); // milliseconds to minutes
}

function getTrains(route, trains) {
  const filtered = trains.filter((entry) => entry.route === route);
  return filtered.map((entry) => {
    return minutesAway(entry.time);
  });
}

module.exports = app;
