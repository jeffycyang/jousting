// Packages
var express = require('express');
var teamRouter = express.Router();
var authenticate = require('../services/authenticate.js');

// Controllers
var userCtrl = require('../controllers/user.server.controller');
var teamCtrl = require('../controllers/team.server.controller');

var router = function() {

  teamRouter.route('/gauntlet')
  .get(function(req, res) {
    authenticate(req, res);
  });

  teamRouter.route('/createTeam')
  .post(function (req, res) {
  	console.log("what the "+JSON.stringify(req.body));
  	teamCtrl.createTeam(req, res);
  });

  teamRouter.route('/joinTeam')
  .post(function (req, res) {
  	console.log(req.body);
  	userCtrl.joinTeam(req, res);
  });

   teamRouter.route('/leaveTeam')
  .post(function (req, res) {
    console.log(req.body);
    userCtrl.leaveTeam(req, res);
  });

  teamRouter.route('/listAllTeams')
  .get(function (req, res) {
    console.log(req.body);
    teamCtrl.listAllTeams(req, res);
  });

  return teamRouter;
};


module.exports = router;