//make a call to FB, we need request
var config = require('../services/config.js');
var createSendToken = require('../services/jwt.js');
var request = require('request');
var qs = require('querystring');
var User = require('../models/user.server.model.js');

module.exports = function(req, res) {
  // need two URLS. The URL where we exchange our authorization code for the token
  var accessTokenUrl = 'https://graph.facebook.com/oauth/access_token';
  //Facebook API URL where we get profile information, and Facebook calls that the graphAPI
  var graphApiUrl = 'https://graph.facebook.com/me?fields=id,name,email,picture';

  var params = {
    client_id: req.body.clientId,
    redirect_uri: req.body.redirectUri,
    client_secret: config.FACEBOOK_SECRET,
    code: req.body.code
  }; 

  request.get({
    url: accessTokenUrl, 
    qs: params
  },  function(err, response, accessToken) {
        accessToken = qs.parse(accessToken);

        request.get({
          url: graphApiUrl, 
          qs: accessToken, 
          json: true
        },  function(err, response, profile) {
              User.findOne({
              facebookId: profile.id
            },  function(err, existingUser) {
                  if (existingUser) {
                    return createSendToken(existingUser, res);
                  }

                  var newUser = new User({
                  fullName:   profile.name,
                  userName:   profile.name,
                  email:      profile.email,
                  points:     0,
                  picture:    profile.picture.data.url
                  });
                  
                  newUser.save(function(err) {
                    createSendToken(newUser, res);
                  }); 
                });
            });
      });
};