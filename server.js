const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./app/routes');
const database = require('./app/databases');

// Port number
const PORT = (process.env.PORT || 3100);

// Root url of API
const apiEndPoint = '/api';

// initialising app
const app = express();
const server = http.createServer(app);

// allows application to use json body from request
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// establish a connection with database
database.db();

// setting routes of application
app.use(apiEndPoint, routes);

// starting server
server.listen(PORT);

module.exports = server;