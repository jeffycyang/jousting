// Packages
var express = require('express');
var rosterRouter = express.Router();

// Controllers
var teamCtrl = require('../controllers/team.server.controller');
var userCtrl = require('../controllers/user.server.controller');

var router = function() {

  rosterRouter.route('/roster')
  .post(function (req, res) {
  	teamCtrl.listUsers(req, res);
  });

  rosterRouter.route('/getTeamName')
  .post(function (req, res) {
    userCtrl.listTeams(req, res);
  });

  return rosterRouter;
};

module.exports = router;