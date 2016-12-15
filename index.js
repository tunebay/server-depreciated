const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();

// App set up
app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*' }));


// Server set up
const port = process.env.PORT || 8080;
const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
