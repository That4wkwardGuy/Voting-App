const Voter = require("./../Schemas/VoterSchema");
const Polls = require("./../Schemas/PollSchema");
const jwt = require("jsonwebtoken");
const secrets = {
  secret: process.env.secret || require("./../config/passwords").secret,
  DBhost: process.env.DBhost || require("./../config/passwords").DBhost
};

const secret = secrets.secret;

const getMyPolls = (req, res) => {
  jwt.verify(req.body.jwt, secret, (err, token) => {
    if (err) res.send(err);
    else {
      Voter.findById(token._id)
        .populate("createdPolls")
        .exec((err, result) => {
          if (err) console.log(err);
          else {
            res.json(result.createdPolls);
          }
        });
    }
  });
};

module.exports = getMyPolls;
