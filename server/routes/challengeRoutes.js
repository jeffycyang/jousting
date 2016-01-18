// Packages
var express = require('express');
var challengeRouter = express.Router();

// Controllers
var userCtrl = require('../controllers/user.server.controller');
var challengeCtrl = require('../controllers/challenge.server.controller');
var submissionCtrl = require('../controllers/submission.server.controller');

var router = function() {

  challengeRouter.route('/createChallenge')
  .post(function (req, res) {
  	challengeCtrl.createChallenge(req, res);
  });

  challengeRouter.route('/completeChallenge')
  .post(function (req, res) {
    challengeCtrl.completeChallenge(req, res);
  });

  challengeRouter.route('/listTeamChallenges')
  .post(function (req, res) {
    challengeCtrl.listTeamChallenges(req, res);
  });  

  challengeRouter.route('/getChallengeUsers')
  .post(function (req, res) {
    challengeCtrl.getChallengeInfo(req, res);
  });

  challengeRouter.route('/listChallengeSubmissions')
  .post(function (req,res) {
  	submissionCtrl.listChallengeSubmissions(req, res);
  });

  challengeRouter.route('/listUserSubmissions')
  .post(function (req,res) {
  	submissionCtrl.listUserSubmissions(req, res);
  });

  challengeRouter.route('/getSubmissionInfo/:userName/:challengeName')
  .get(function (req, res) {
    submissionCtrl.getSubmissionInfo(req, res);
  });

  return challengeRouter;
};

module.exports = router;