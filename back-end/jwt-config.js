require("dotenv").config({ silent: true }) // load environmental variables from a hidden file named .env
const passportJWT = require("passport-jwt")
const ExtractJwt = passportJWT.ExtractJwt
const JwtStrategy = passportJWT.Strategy

const User = require('./models/userModel')

// set up some JWT authentication options
let jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt") // look for the Authorization request header
jwtOptions.secretOrKey = process.env.JWT_SECRET // an arbitrary string used during encryption - see the .env file

const jwtStrategy = new JwtStrategy(jwtOptions, function (jwt_payload, next) {
  console.log("JWT payload received", jwt_payload)
  // try to find a matching user in our "database"
  const user = User.findById(jwt_payload.id , function(err, user) {
    if (user) {
      console.log(user)
      return next(null, user);
    }
    else{
      return next(null, false);
    }
  });
})

module.exports = {
  jwtOptions,
  jwtStrategy,
}