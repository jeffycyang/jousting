var User = require('../models/user.server.model.js');
var Team = require('../models/team.server.model.js');
var Challenge = require('../models/challenge.server.model.js');
var Submission = require('../models/submission.server.model.js');

exports.createChallenge = function(req, res) {
    var points 			= req.body.points;
    var teamName 		= req.body.teamName;
    var challengeName 	= req.body.challengeName;
    var picture			= req.body.picture;

    Team.findOne({ teamName: teamName })
        .exec(function(err, team) {
            var challenge = new Challenge({
                challengeName:  challengeName,
                team:           team._id,
                points: 		points,
                picture:        picture
            });

            team.challenges.addToSet(challenge._id);

            challenge.save(function(err) {
                if (err) {
                    var errMsg = 'Sorry, there was an error creating your challenge ' + err;
                    console.log(errMsg);
                    res.sendStatus(500);
                } else {
                    team.save(function(err) {
                        if (err) {
                            var errMsg = 'Sorry, there was an error creating your challenge ' + err;
                            console.log(errMsg);
                            res.sendStatus(500);
                        } else {
                            console.log('Challenge created');
                            res.sendStatus(200);
                        }
                    });
                }
            });
        });
};

exports.completeChallenge = function(req, res) {
    var email 		    = req.body.email;
	var challengeName 	= req.body.challengeName;
    var comment         = req.body.comment;
    var sub             = req.body.submission;
    var contentType     = req.body.contentType;

	User.findOne({ email: email })
		.exec(function(err, user){
			Challenge.findOne({ challengeName: challengeName })
                .populate( 'submissions usersCompleted' )
				.exec(function(err, challenge){
                    var submission = new Submission({
                        submission:     sub,
                        contentType:    contentType,
                        comment:        comment,
                        user:           user._id,
                        userName:       user.userName,
                        challenge:      challenge._id,
                        team:           challenge.team
                    });

					user.completedChallenges.addToSet(challenge._id);
					user.submissions.addToSet(submission._id);

                    if(challengeName === 'selfieChallenge'){
    					//check if someone completed
    					if(challenge.usersCompleted.length===0){
    						user.points += challenge.points;
    					}
                    }
                    if(challengeName === 'tapChallenge'){
                        //check which is highest
                        var highest=true;
                        if(challenge.submissions.length>0){
                            var currHighest=0;
                            var currHighestUserID;
                            for(var i=0;i<challenge.submissions.length;i++){
                                if(Number(challenge.submissions[i]['submission'])>currHighest){
                                    currHighest=Number(challenge.submissions[i]['submission']);
                                    currHighestUserID=challenge.submissions[i]['user'];
                                }
                                if(Number(challenge.submissions[i]['submission'])>=Number(sub)){
                                    highest=false;
                                }
                            }
                        }
                        if(highest){
                            user.points += challenge.points;
                        }
                    }
                    if(challengeName === 'shakeChallenge'){
                        //check which is highest
                        var highest=true;
                        if(challenge.submissions.length>0){
                            var currHighest=0;
                            var currHighestUserID;
                            for(var i=0;i<challenge.submissions.length;i++){
                                if(Number(challenge.submissions[i]['submission'])>currHighest){
                                    currHighest=Number(challenge.submissions[i]['submission']);
                                    currHighestUserID=challenge.submissions[i]['user'];
                                }
                                if(Number(challenge.submissions[i]['submission'])>=Number(sub)){
                                    highest=false;
                                }
                            }
                        }
                        if(highest){
                            user.points += challenge.points;
                        }
                    }

					challenge.usersCompleted.addToSet(user._id);
                    challenge.submissions.addToSet(submission._id);

                    submission.save(function(err) {
                        if (err) {
                            var errMsg = 'Sorry, there was an error completing the challenge ' + err;
                            console.log(errMsg);
                            res.sendStatus(500);
                        } else {
        					challenge.save(function(err) {
                                if (err) {
                                    var errMsg = 'Sorry, there was an error completing the challenge ' + err;
                                    console.log(errMsg);
                                    res.sendStatus(500);
                                } else {
                                    user.save(function(err) {
                                        if (err) {
                                            var errMsg = 'Sorry, there was an error completing the challenge ' + err;
                                            console.log(errMsg);
                                            res.sendStatus(500);
                                        } else {

                                            if(currHighestUserID&&highest){
                                                User.findOne({ _id: currHighestUserID })
                                                    .exec(function(err, userSub){
                                                        userSub.points -= challenge.points;
                                                        userSub.save(function(err) {
                                                            if (err) {
                                                                var errMsg = 'Sorry, there was an error completing the challenge ' + err;
                                                                console.log(errMsg);
                                                                res.sendStatus(500);
                                                            } else {
                                                                console.log('Challenge completed!');
                                                                res.sendStatus(200);
                                                            }
                                                        });
                                                    });
                                            }else{
                                                console.log('Challenge completed!');
                                                res.sendStatus(200);                                                
                                            }

                                            // console.log('Challenge completed!');
                                            // res.sendStatus(200);
                                        }
                                    });
                                }
                            });
                        }
                    });

				});
		});

};

exports.listTeamChallenges = function(req, res) {
	var teamName = req.body.teamName;

	Team.findOne({ teamName: teamName })
		.populate( 'challenges' )
		.sort({ createdOn: 'desc' })
		.exec(function(err, team) {
			console.log(teamName+" challenges "+JSON.stringify(team.challenges));
			res.send({ challenges: team.challenges });
		});
};

exports.listAllChallenges = function(req, res) {
    Challenge.find()
        .sort({ createdOn: 'desc'})
        .exec(function(err, challenges){
           console.log("challenges "+JSON.stringify(challenges));
           res.send({ challenges: challenges });
        });
};

exports.getChallengeInfo = function(req, res) {
	var challengeName = req.body.challengeName;

	Challenge.findOne({ challengeName: challengeName })
		.populate( 'team usersCompleted' )
		.exec(function(err, challenge) {
			console.log("challenge "+JSON.stringify(challenge));
			console.log("points challenge is worth "+JSON.stringify(challenge.points));
			console.log("team associated with challenge "+JSON.stringify(challenge.team));
			console.log("users who completed challenge "+JSON.stringify(challenge.usersCompleted));
			//res.send({ challenge: challenge });

			Team.findOne({ teamName: challenge.team.teamName })
				.populate( 'users' )
				.exec(function(err, team) {
					console.log("users "+JSON.stringify(team.users));
					res.send({ users: team.users, challenge: challenge });
				});

		});
};

exports.listUsersCompleted = function(req, res) {
	var challengeName = req.body.challengeName;

	Challenge.findOne({ challengeName: challengeName })
		.populate( 'usersCompleted' )
		.sort({ createdOn: 'desc' })
		.exec(function(err, challenge) {
			console.log("users who completed challenge "+JSON.stringify(challenge.usersCompleted));
            res.send({ usersCompleted: challenge.usersCompleted });
		});	
};

exports.removeChallenge = function(req, res) {

};
