var User = require('../models/user.server.model.js');
var Team = require('../models/team.server.model.js');
var createSendToken = require('../services/jwt.js');

exports.createUser = function(req, res) {
    
  req.user = req.body;

  var searchUser = {
    email: req.user.email
  };

  User.findOne(searchUser, function(err, user) {
    if(err) {
      throw err;
    }

    if(user) {
      return res.status(401).send({message: 'Email already exists'});
    }

    var newUser = new User({
        fullName:   req.user.fullName,
        userName:   req.user.userName,
        password:   req.user.password,
        email:      req.user.email,
        points:     0,
        picture:    'img/default-user.jpeg'
    });

    newUser.save(function(err) {
        createSendToken(newUser, res);
    });
  });

};

exports.listAllUsers = function(req, res) {
    User.find()
        .sort({ createdOn: 'desc'})
        .exec(function(err, users){
           console.log("users "+JSON.stringify(users));
           res.send({ users: users });
        });
};

exports.getUserInfo = function(req, res) {
    var email = req.body.email;

    User.findOne({ email: email })
        .populate( 'teams completedChallenges' )
        .sort({ createdOn: 'desc'})
        .exec(function(err, user) {
            console.log("user "+JSON.stringify(user));
            console.log("teams "+JSON.stringify(user.teams));
            console.log("completed challenges "+JSON.stringify(user.completedChallenges));
            res.send({ user: user });
        });
};

exports.joinTeam = function(req, res) {
    var email = req.body.email;
    var teamName = req.body.teamName;

    User.findOne({ email: email })
        .exec(function(err, user){
            Team.findOne({ teamName: teamName })
                .exec(function(err, team){
                    if (err) {
                        return res.sendStatus(500);
                    }
                    if (!team) {
                        return res.sendStatus(500);
                    } else {
                        team.users.addToSet(user._id);
                        user.teams.addToSet(team._id);
                        team.save(function(err) {
                            if (err) {
                                var errMsg = 'Sorry, there was an error adding user to team ' + err;
                                console.log(errMsg);
                                res.sendStatus(500);
                            } else {
                                user.save(function(err) {
                                    if (err) {
                                        var errMsg = 'Sorry, there was an error adding team to users teams ' + err;
                                        console.log(errMsg);
                                        res.sendStatus(500);
                                    } else {
                                        console.log('Team joined!');
                                        res.sendStatus(200);
                                    }
                                });
                            }
                    });
                }
        });
});
};

exports.leaveTeam = function(req, res) {
    var email = req.body.email;
    var teamName = req.body.teamName;

    User.findOne({ email: email })
        .exec(function(err, user) {
            Team.findOne({ teamName: teamName })
                .exec(function(err, team) {
                    if (err) {
                        return res.sendStatus(500);
                    }
                    if (!team) {
                        return res.sendStatus(500);
                    } else {
                        user.teams.pull( team._id );
                        team.users.pull( user._id );
                      
                        team.save(function(err) {
                            if (err) {
                                var errMsg = 'Sorry, there was an error leaving the team ' + err;
                                console.log(errMsg);
                                res.sendStatus(500);
                            } else {
                                user.save(function(err) {
                                    if (err) {
                                        var errMsg = 'Sorry, there was an error leaving the team ' + err;
                                        console.log(errMsg);
                                        res.sendStatus(500);
                                    } else {
                                        console.log('Team left!');
                                        res.sendStatus(200);
                                    }
                                });    
                            }
                        });
                    }});
        });
};

exports.listCompletedChallenges = function(req, res) {
    var email = req.body.email;

    User.findOne({ email: email })
        .populate( 'completedChallenges' )
        .sort({ createdOn: 'desc'})
        .exec(function(err, user) {
            console.log('completed challenges'+user.completedChallenges);
            res.send({ completedChallenges: user.completedChallenges });
        });
};

//not really necessary, functionality covered by getUserInfo
exports.listTeams = function(req, res) {
    var email = req.body.email;

    User.findOne({ email: email })
        .populate( 'teams' )
        .sort({ createdOn: 'desc'})
        .exec(function(err, user) {
            if (err) {
                return res.sendStatus(500);
            }
            if (!user) {
                return res.sendStatus(500);
            } else {    
                res.send({ teams: user.teams });
            }
        });
};

exports.verifyUser = function(req, res) {

  req.user = req.body;

  var searchUser = {
    email: req.user.email
  };

  User.findOne(searchUser, function(err, user) {
    if(err) {
      throw err;
    }

    if(!user) {
      return res.status(401).send({message: 'Wrong username/password'}); 
    }

    user.comparePasswords(req.user.password, function(err, isMatch) {
      if(err) {
        throw err;
      }
      console.log(isMatch);
      if(!isMatch) {
        return res.status(401).send({message: 'Wrong username/password'});
      }
      createSendToken(user, res);
    });
  });

};


