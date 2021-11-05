// import and instantiate express
const express = require("express") // CommonJS import style!

const axios = require("axios") // middleware for making requests to APIs

const app = express() // instantiate an Express object

// route for HTTP GET requests to the root document
app.get("/", (req, res) => {
    res.send("Goodbye world!")
})

// proxy requests to/from an API
app.get("/apiCallTest", (req, res, next) => {
    axios
      .get("https://my.api.mockaroo.com/line0.json?key=57b58bf0")
      .then(apiResponse => res.json(apiResponse.data)) // pass data along directly to client
      .catch(err => next(err)) // pass any errors to express
})


module.exports = app