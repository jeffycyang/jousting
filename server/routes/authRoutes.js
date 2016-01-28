var express = require('express');
var authRouter = express.Router();

var userCtrl = require('../controllers/user.server.controller');

var router = function() {

  authRouter.route('/register')
  .post(function(req, res) {
    userCtrl.createUser(req, res);
  });

  authRouter.route('/login')
  .post(function(req, res) {
    userCtrl.verifyUser(req, res);
  });
  
  return authRouter;
};

module.exports = router;