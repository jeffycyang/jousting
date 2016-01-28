var User = require('../models/user.server.model.js');
var Team = require('../models/team.server.model.js');
var Challenge = require('../models/challenge.server.model.js');

exports.createTeam = function(req, res) {
    var teamName = req.body.teamName;
    var email = req.body.email;
    var picture  = req.body.picture;

    User.findOne({ email: email })
        .exec(function(err, user) {
            var team = new Team({
                teamName:   teamName,
                createdBy:  user._id,
                users:      [ user._id ],
                picture :   picture
            });

            user.teams.addToSet(team._id);

            team.save(function(err) {
                if (err) {
                    var errMsg = 'Sorry, there was an error creating your team ' + err;
                    console.log(errMsg);
                    res.sendStatus(500);
                } else {
                    user.save(function(err) {
                        if (err) {
                            var errMsg = 'Sorry, there was an error creating your team ' + err;
                            console.log(errMsg);
                            res.sendStatus(500);
                        } else {
                            console.log('Team created!');
                            res.sendStatus(200);
                        }
                    });
                }
            });
    });
};

exports.listAllTeams = function(req, res) {
    Team.find()
        .sort({ createdOn: 'desc'})
        .exec(function(err, teams){
            console.log("all teams "+JSON.stringify(teams));
            res.send({ teams: teams });
        });
};

exports.getTeamInfo = function(req, res) {
    var teamName = req.body.teamName;

    Team.findOne({ teamName: teamName })
        .populate( 'users createdBy challenges' )
        .sort({ createdOn: 'desc'})
        .exec(function(err, team) {
            // console.log("team "+JSON.stringify(team));
            // console.log("team leader "+JSON.stringify(team.createdBy));
            // console.log("users "+JSON.stringify(team.users));
            // console.log("challenges "+JSON.stringify(team.challenges));
            res.send({ team: team });
        });
};


exports.removeUser = function(req, res) {
    var teamName = req.body.teamName;
    var email = req.body.email;
    
    Team.findOne({ teamName: teamName })
        .exec(function(err, team) {
            User.findOne({ email: email })
                .exec(function(err, user) {
                    team.users.pull( user._id );
                    user.teams.pull( team._id );

                    user.save(function(err) {
                        if (err) {
                            var errMsg = 'Sorry, there was an error removing the user ' + err;
                            console.log(errMsg);
                            res.sendStatus(500);
                        } else {
                            team.save(function(err) {
                                if (err) {
                                    var errMsg = 'Sorry, there was an error removing the user ' + err;
                                    console.log(errMsg);
                                    res.sendStatus(500);
                                } else {
                                    console.log('User removed!');
                                    res.sendStatus(200);
                                }
                            });    
                        }
                    });
                });
        });
};

//not really necessary, functionality covered by getTeamInfo
exports.listUsers = function(req, res) {
    var teamName = req.body.teamName;

    Team.findOne({ teamName: teamName })
        .populate( 'users' )
        .sort({ createdOn: 'desc' })
        .exec(function(err, team) {
            // console.log("team members "+JSON.stringify(team.users));
            res.send({ users: team.users });
        });
};

//not really necessary, same as joinTeam in user.server.controller
exports.addUser = function(req, res) {
    var teamName = req.body.teamName;
    var userName = req.body.userName;

    User.findOne({ userName: userName })
        .exec(function(err, user){
            Team.findOne({ teamName: teamName })
                .exec(function(err, team){
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
                                    console.log('User added!');
                                    res.sendStatus(200);
                                }
                            });
                        }
                    });
                });
        });
};
