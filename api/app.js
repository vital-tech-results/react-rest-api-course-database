'use strict';
// load modules
const express = require('express');
const morgan = require('morgan');
const apiRouter = require('./routes/users');
const indexRouter = require('./routes/index');
const courseRouter = require('./routes/courses');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require("path");

// variable to enable global error logging
const enableGlobalErrorLogging = process.env.ENABLE_GLOBAL_ERROR_LOGGING === 'true';

// create the Express app
const app = express();


app.use(express.static(path.join(__dirname, 'build')));

// set the production build path
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// when posting new item to DB "need to move your body parsing middleware before your routes so that the request body is parsed first before executing your route handlers:" see: https://stackoverflow.com/questions/39409982/node-js-cannot-read-property-39firstname39-of-undefined

app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ extended: true }));

// setup morgan which gives us http request logging
app.use(morgan('dev'));
app.use(cors());
// app.options('*', cors());

app.use('/api', indexRouter);
app.use('/api/users', apiRouter);
app.use('/api/courses', courseRouter);

// setup a friendly greeting for the root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the REST API project!',
  });
});

// send 404 if no other route matched
app.use((req, res) => {
  res.status(404).json({
    message: 'Route Not Found',
  });
});

// setup a global error handler
app.use((err, req, res, next) => {
  if (enableGlobalErrorLogging) {
    console.error(`Global error handler: ${JSON.stringify(err.stack)}`);
  }

  res.status(err.status || 500).json({
    message: err.message,
    error: {},
  });
});

// set the port
app.set('port', process.env.PORT || 5000);

// start listening on our port
const server = app.listen(app.get('port'), () => {
  console.log(`Express server is listening on port ${server.address().port}`);
});


