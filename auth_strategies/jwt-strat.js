const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const secrets = {
  secret: process.env.secret || require("./../config/passwords").secret,
  DBhost: process.env.DBhost || require("./../config/passwords").DBhost
};

const secret = secrets.secret;
const Voter = require("./../Schemas/VoterSchema");

let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = secret;

module.exports = strat = new JwtStrategy(opts, (jwt_payload, done) => {
  // console.log(jwt_payload);
  // console.log(done);
  Voter.findById(jwt_payload._id, (err, voter) => {
    // console.log("running");
    if (err) {
      return done(err, false);
    }
    if (voter) {
      return done(null, voter);
    } else {
      return done(null, false);
    }
  });
});
