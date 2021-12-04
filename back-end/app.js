const express = require("express");
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

const cors = require("cors")
// allow incoming requests only from a "trusted" host
app.use(cors({ origin: process.env.FRONT_END_DOMAIN, credentials: true }))

// ====================== MONGODB SETUP ======================

require("dotenv").config({ silent: true });
const mongoose = require("mongoose");
const db_url = process.env.MONGO_DB_URL;
mongoose.connect(db_url, () => {
  console.log("DB connection state: " + mongoose.connection.readyState);
});

//models
const User = require('./models/userModel')
//const FavLine = require('./models/favLineModel')
//const FavStation = require('./models/favStationModel')

// ===================== END MONGODB SETUP ======================

app.use(express.json())

const bcrypt = require('bcrypt');
const saltRounds = 10;

const jwt = require("jsonwebtoken")
const passport = require("passport")
app.use(passport.initialize())

const { jwtOptions, jwtStrategy } = require("./jwt-config.js") // import setup options for using JWT in passport
passport.use(jwtStrategy)

// ===================== SIGNUP ROUTE ======================

app.post("/signup", function (req, res) {
  const username = req.body.username
  const password = req.body.password
  const passwordCheck = req.body.passwordCheck

  if (!username || !password || !passwordCheck) {
    // no username or password received in the POST body... send an error
    res
      .status(401)
      .json({ success: false, message: `no username or password supplied.` })
  }
  if (password != passwordCheck){
    //password doesn't match the password check
    res
      .status(401)
      .json({ success: false, message: `passwords don't match` })
  }
  // encrypt the password and enter it into the database
  bcrypt.hash(password, saltRounds).then(function(hash) {
    const newUser = new User({ username: username, password: hash });
    newUser.save(function(err) {
      if (err) {
        console.log(err)
        if (err.name === 'MongoServerError' && err.code === 11000) {
          // Duplicate username
          return res.status(422).send({ succes: false, message: 'User already exist!' });
        }
        // Some other error
        return res.status(401).send(err);
      }
      return res.json({ success: true, username: req.body.username});
    });
  });

  /*
  User.findOne({ username: req.body.username}, 'password', function (err, users) {
    if (err) return res.status(401).json({ success: false, message: `user not found: ${tUsername}.` });
    const payload = { id: users.id } // some data we'll encode into the token
    const token = jwt.sign(payload, jwtOptions.secretOrKey) // create a signed token
    res.json({ success: true, username: req.body.username, token: token }) // send the token to the client to store
  });
  */
});

// ===================== END SIGNUP ROUTE ======================

// ===================== LOGIN ROUTE ======================
app.post("/login", function (req, res) {
  const tUsername = req.body.username
  const tPassword = req.body.password
  // console.log(`${tUsername}, ${tPassword}`) debugging

  if (!tUsername || !tPassword) {
    // no username or password received in the POST body... send an error
    res
      .status(401)
      .json({ success: false, message: `no username or password supplied.` })
  }

  User.findOne({ username: tUsername}, 'password', function (err, users) {
      if (err)
        return res.status(401).json({ success: false, message: `user not found: ${tUsername}.` });
      const retPass = users.password;
      // assuming we found the user, check the password is correct
      bcrypt.compare(tPassword, retPass).then(function(result) {
        //console.log(result) debugging
        if (result){
          const payload = { id: users.id } // some data we'll encode into the token
          const token = jwt.sign(payload, jwtOptions.secretOrKey) // create a signed token
          res.json({ success: true, username: tUsername, token: token }) // send the token to the client to store
        }
        else{
          res.status(401).json({ success: false, message: "passwords did not match" })
        }
      });
  })
});

// ===================== END LOGIN ROUTE ======================


// parse stations file
const stationsData = JSON.parse(
  fs.readFileSync("../MTAPI-master/data/stations.json").toString()
);
const stationIDs = Object.keys(stationsData);

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
