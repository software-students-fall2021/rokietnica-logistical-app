#!/usr/bin/env node
const { Mongoose } = require("mongoose");
const server = require("./app"); // load up the web server
const port = process.env.PORT || 4000; // the port to listen to for incoming requests
// call express's listen function to start listening to the port
const listener = server.listen(port, function () {
  console.log(`Server running on port: ${port}`);
});
// a function to stop listening to the port
const close = () => {
  listener.close();
};
const db_url = process.env.MONGO_DB_URL;
Mongoose.connect(db_url, () =>{
  console.log("DB connection state: " + Mongoose.connection.readyState);
});

module.exports = {
  close: close,
};
