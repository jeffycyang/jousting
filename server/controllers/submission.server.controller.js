var User = require('../models/user.server.model.js');
var Team = require('../models/team.server.model.js');
var Challenge = require('../models/challenge.server.model.js');
var Submission = require('../models/submission.server.model.js');

exports.listChallengeSubmissions = function(req, res) {
	challengeName = req.body.challengeName;

	Challenge.findOne({ challengeName: challengeName })
		.populate( 'submissions' )
		.sort({ createdOn: 'desc' })
		.exec(function(err, challenge) {

			if (err) {
                return res.sendStatus(500);
            }
            if (!challenge) {
            	var errMsg = 'Sorry, submissions for this challenge do not exist ' + err;
                console.log(errMsg);
                return res.sendStatus(500);
            } else {
				if(challengeName === 'selfieChallenge') {
					// res.set('Content-Type', 'image/jpeg');
					// res.send(new Buffer(submission['submission'],"base64"));
					var submissions = [];
					for(var i = 0 ; i < challenge.submissions.length ; i++){
						// submissions[i] = new Buffer(challenge.submissions[i]['submission'],"base64");
						submissions[i] = [challenge.submissions[i]['submission'], challenge.submissions[i]['userName']];
					}
					res.send({submissions: submissions});
				}

				if(challengeName === 'shakeChallenge') {
					var submissions = [];
					for(var i = 0 ; i < challenge.submissions.length ; i++){
						submissions[i] = [challenge.submissions[i]['submission'], challenge.submissions[i]['userName']];
					}
					res.send({submissions: submissions});
				}

				if(challengeName === 'tapChallenge') {
					var submissions = [];
					for(var i = 0 ; i < challenge.submissions.length ; i++){
						submissions[i] = [challenge.submissions[i]['submission'], challenge.submissions[i]['userName']];
					}
					res.send({submissions: submissions});
				}
			}

		});
};

exports.getSubmissionInfo = function(req, res) {
	challengeName = req.params.challengeName;
	userName = req.params.userName;

	Challenge.findOne({ challengeName: challengeName })
		.exec(function(err, challenge) {
			User.findOne({ userName: userName })
				.exec(function(err, user) {
					Submission.findOne({ challenge: challenge._id, user: user._id })
						.exec(function(err, submission) {

							// res.writeHead(200, {'Content-Type': 'image/jpeg'});
							// res.write(new Buffer(submission['submission'],"base64"));
							// res.end();

							if (err) {
		                        return res.sendStatus(500);
		                    }
		                    if (!submission) {
		                    	var errMsg = 'Sorry, submission does not exist ' + err;
                                console.log(errMsg);
		                        return res.sendStatus(500);
		                    } else {
								if(challengeName === 'selfieChallenge') {
									res.set('Content-Type', 'image/jpeg');
									res.send(new Buffer(submission['submission'],"base64"));
								}

								if(challengeName === 'shakeChallenge') {
									res.set('Content-Type', 'text/html');
									res.send(submission['submission']);
								}

								if(challengeName === 'tapChallenge') {
									res.set('Content-Type', 'text/html');
									res.send(submission['submission']);
								}
							}

						});
				});
		});
};

exports.listUserSubmissions = function(req, res) {
	userName = req.body.userName;

	User.findOne({ userName: userName })
		.populate( 'submissions' )
		.sort({ createdOn: 'desc' })
		.exec(function(err, user) {
			console.log("user submissions "+JSON.stringify(user.submissions));
			res.send({ submissions: user.submissions });
		});
};
