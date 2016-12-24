const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const router = require('./router');

const app = express();

// App set up
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('combined'));
}

app.use(bodyParser.json());
router(app);

module.exports = app;
