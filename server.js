const express = require("express");
const app = express();
const mongoose = require("mongoose");
const secrets = require("./config/passwords");
const authStrat = require("./auth_strategies/jwt-strat");
const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require("cors");
const port = 5000;

app.use(cors());

//route functions
const createPoll = require("./routes/createPoll");
const getPoll = require("./routes/getPoll");
const getPolls = require("./routes/getPolls");
const createUser = require("./routes/createUser");
const loginUser = require("./routes/loginUser");
const vote = require("./routes/vote");

//body middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//authentication middleware
app.use(passport.initialize());
app.use(passport.session());
passport.use(authStrat);

//database
mongoose.connect(
  secrets.DBhost,
  () => {
    console.log("connected to db");
  }
);

//public route for creating new polls
// may return errors
// name: message: "Path name is required"
// options: message: "must contain between 2 and 100 characters"
app.post("/api/newpoll", (req, res) => {
  createPoll(req, res);
});

//public route for retrieving information on a single poll
app.get("/api/poll/:id", (req, res) => {
  getPoll(req, res);
});

app.get("/api/polls/:name", (req, res) => {
  getPolls(req, res);
});

//public route for creating a user
app.post("/api/createuser", (req, res) => {
  createUser(req, res);
});

//public route for logging a user in
app.post("/api/login", (req, res) => {
  // console.log("here");
  loginUser(req, res);
});

//temp route for posting a vote
app.post(
  "/api/vote/:optionId",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    vote(req, res);
  }
);

app.listen(port, () => {
  console.log(`serving app on port ${port}`);
});
