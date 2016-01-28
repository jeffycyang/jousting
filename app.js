// Packages
var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var busboyBodyParser = require('busboy-body-parser');
var User = require('./server/models/user.server.model.js');
// Create Express instance
var app = express();
var port = process.env.port || 8000;
// var server = require('http').createServer(app);
// var io = require('socket.io').listen(server);
// app.set('port', port);

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/jousting_db');

// Middlewares
app.use(express.static(__dirname + '/public/mobile/www'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(busboyBodyParser());

// Enable CORS
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  next();
});

// Routers
var authRouter = require('./server/routes/authRoutes')();
var teamRouter = require('./server/routes/teamRoutes')();
var rosterRouter = require('./server/routes/rosterRoutes')();
var challengeRouter = require('./server/routes/challengeRoutes')();

var facebookRouter = require('./server/routes/facebookRoutes.js');
app.post('/auth/facebook', facebookRouter);


// Routes
app.use('/', authRouter, teamRouter, rosterRouter, challengeRouter);

// server.listen(8000);

// io.on('connection', function (socket) {
//     var challenge = {title: 'Selfie Challenge!'}
//     console.log('socket connected');
//     var notifyInterval = setInterval(function() {
//         socket.emit('sendNotification', challenge.title)
//         }, 1000);

//     socket.on('disconnect', function () {
//         console.log('socket disconnected');
//     });

app.listen(port, function (err) {
  console.log('running server on port over ' + port + "!!!!");
});