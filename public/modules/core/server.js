var express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');
const { errors } = require('celebrate');
const cookieparser = require("cookie-parser");

const routes = require('../api/v1');

const app = express();

//
app.use(express.json());

// Enable reverse proxy
app.enable('trust proxy');

// Use cookie-parser
app.use(cookieparser());

// Handle cross origin resource sharing (CORS)
app.use(cors());

// Enable passport for API authorization
app.use(passport.initialize());

// Enable HTTP verbs such as PUT or DELETE
app.use(require('method-override')());

// Transform raw string to JSON format
app.use(bodyParser.json());

// Enable file upload
app.use(bodyParser.urlencoded({ extended: false }));

// Load routing
app.use('/api', routes());

// Error handling
// Enable error logging to stderr
app.use((err, req, res, next) => {
  console.error(err.stack);
  next(err);
});

// Error handling for celebrate validation
app.use(errors());

// Handle other errors
app.use((err, req, res, next) => {
  if (err.status === 401) {
    return res.status(err.status)
      .send({
        statusCode: 401,
        error: 'Unauthorized access',
        message: err.message,
      })
      .end();
  }

  return res.status(err.status || 500)
    .send({
      statusCode: err.status || 500,
      error: 'Internal server error',
      message: err.message,
    })
    .end();
});

module.exports = app;