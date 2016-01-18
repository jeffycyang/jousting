var jwt = require('jwt-simple');
var moment = require('moment');
var config = require('./config.js');

module.exports = function(user, res) {
  var payload = { 
    //supply subject, which is the user
    sub: user.id,
    exp: moment().add(10, 'days').unix()
  };

  var token = jwt.encode(payload, config.SECRET);
  res.status(200).send({
    user: user.toJSON(),
    token: token
  });
};