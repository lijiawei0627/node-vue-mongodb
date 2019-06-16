const JwtStrategy = require('passport-jwt').Strategy,
      ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose')
const Users = mongoose.model('User')

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';

module.exports = (passport) => {
  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    console.log(jwt_payload)
    Users.findById(jwt_payload.id)
      .then((user) => {
        if (user) {
          return done(null, user)
        } else {
          return done(null, false)
        } 
      })
      .catch((err) => {
        console.log(err)
      })
  }));
}