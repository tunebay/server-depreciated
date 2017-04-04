const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const router = require('./router');
const passport = require('passport');

const app = express();

// App set up
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('combined'));
}

// const corsConfig = {
//   origin: 'http://localhost:8080',
//   optionsSuccessStatus: 200
// };

// app.use(cors(corsConfig));
app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
router(app);

module.exports = app;
