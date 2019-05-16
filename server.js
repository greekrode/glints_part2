const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const passport = require("passport");
const users = require("./routes/api/users");
const restaurants = require('./routes/api/restaurants');
const collections = require('./routes/api/collections');
const cors = require('cors');
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  path: '/'
});

app.locals.socket = io;

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// setup CORS
app.use(cors({
  credentials: true,
  origin: true
}));

// Passport config
require("./config/passport")(passport);

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});

// Routes
app.use("/api/users", users);
app.use("/api/restaurants", passport.authenticate('jwt', {session: false}), restaurants);
app.use("/api/collections", passport.authenticate('jwt', {session: false}), collections);

const port = process.env.PORT || 5000;

http.listen(port, () => console.log(`Server up and running on port ${port} !`));
