const express = require("express");
const axios = require("axios"); // middleware for making requests to APIs

const app = express(); // instantiate an Express object
const fs = require("fs");

const API_DOMAIN = "http://localhost:5000";
require("dotenv").config({ silent: true });
 
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

const mongoose = require("mongoose");
const db_url = process.env.MONGO_DB_URL;
mongoose.connect(db_url, () => {
  console.log("DB connection state: " + mongoose.connection.readyState);
});

//models
const User = require('./models/userModel')
const FavStation = require('./models/favStationModel')
const FavLine = require('./models/favLineModel')

// ===================== END MONGODB SETUP ======================

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

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
          return res.status(422).send({ success: false, message: 'User already exist!' });
        }
        // Some other error
        return res.status(401).send(err);
      }
      return res.json({ success: true, username: req.body.username});
    });
  });
});

// ===================== END SIGNUP ROUTE ======================

// ===================== LOGIN ROUTE ======================
app.post("/login", function (req, res) {
  const tUsername = req.body.username
  const tPassword = req.body.password
  //console.log(`${tUsername}, ${tPassword}`) //debugging

  if (!tUsername || !tPassword) {
    // no username or password received in the POST body... send an error
    res
      .status(401)
      .json({ success: false, message: `no username or password supplied.` })
  }

  User.findOne({ username: tUsername}, 'password', function (err, users) {
    //console.log(users)
      if (users == null || err)
        res.status(401).json({ success: false, message: `error` });
      else{
        const retPass = users.password;
        // assuming we found the user, check the password is correct
        bcrypt.compare(tPassword, retPass).then(function(result) {
          //console.log("===" + result) //debugging
          if (result){
            const payload = { id: users.id } // some data we'll encode into the token
            const token = jwt.sign(payload, jwtOptions.secretOrKey) // create a signed token
            res.json({ success: true, username: tUsername, token: token }) // send the token to the client to store
          }
          else{
            res.status(401).json({ success: false, message: "passwords did not match" })
          }
        });
      }

  })
  return;
});

// ===================== END LOGIN ROUTE ======================

// ====================== FAVOURITE STATIONS ===================

app.get("/addFavStation/:id", passport.authenticate("jwt", { session: false }), (req, res, next) => {
  const stationId = req.params.id;
  FavStation.findOne({userId : req.user.id}, "stationIds",function(err, userFav){
    if (err) {
      console.log(err)
      return res.status(401).send(err);
    }
    if (userFav == null){
      const newFav = new FavStation({
        userId: req.user.id,
        stationIds: [stationId]
      })
      newFav.save();
      return res.json({success: true, message: "first station saved"})
    }
    else{
      if(userFav.stationIds.includes(stationId)){
        return res.status(422).send({ success: false, message: 'Station Already Saved' });
      }
      else{
        userFav.stationIds.push(stationId);
        userFav.save();
        return res.json({success: true, message: "station saved"})
      }
    }
  });
});

app.get("/getFavStations/:line", passport.authenticate("jwt", { session: false }), (req, res, next) => {
  const line = req.params.line;
  FavStation.findOne({userId : req.user.id}, "stationIds",function(err, userFav){
    if (userFav == null | err) {
      console.log(err)
      return res.status(401).send(err);
    }
    else{
      const ids = userFav.stationIds.join(",");
      const endpoint = API_DOMAIN + "/by-id/" + ids;
      axios
        .get(endpoint)
        .then((response) => {
          const data = response.data.data
          const retData = {};
          retData.data = parseLines(response.data.data, line)
          retData.stationIds = userFav.stationIds;
          console.log(retData);
          res.json(retData);
        })
        .catch((error) => {
          console.log(error);
          next(error);
        });
      //res.json(userFav);
    }
  });
});



// ===================== END FAVOURITE STATIONS ====================


// parse stations file
const stationsData = JSON.parse(
  fs.readFileSync("../MTAPI-master/data/stations.json").toString()
);
const stationIDs = Object.keys(stationsData);
 
// ================= LINES -> STATIONS ROUTES ==================

app.get("/allLines", (req, res, next) => {
  const endpoint = API_DOMAIN + "/routes"
  axios
    .get(endpoint)
    .then((apiResponse) => {
      res.json(apiResponse.data.data)
    }) // pass data along directly to client
    .catch((err) => next(err)); // pass any errors to express

});
app.get("/lines/:id", (req, res, next) => {
  const endpoint = API_DOMAIN + "/by-route/" + req.params.id
  axios
    .get(endpoint)
    .then((apiResponse) => {
      const data = apiResponse.data.data
      //console.log(data)
      const retVal = parseLines(filterDuplicates(data), req.params.id)
      res.json(retVal)
    }) // pass data along directly to client
    .catch((err) => next(err)); // pass any errors to express
})

function parseLines(data, route){
  data.forEach((e) => {
    //console.log(e.N)
    e.N = getTrains(route, e.N)
    e.S = getTrains(route, e.S)
    e.last_update = minutesAgo(e.last_update)
  })
  return data
}

function filterDuplicates(data){
  const ids = []
  const newData = []
  data.forEach((station) => {
    if(!ids.includes(station.id)){
      ids.push(station.id)
      newData.push(station)
    }
  })
  return newData
}

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
