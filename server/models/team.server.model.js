var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var teamSchema = new Schema({
    teamName: {	
		type: String,
		trim: true,
		unique: true,
    	required: 'Please enter a team name'
	},
    createdBy: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
    users: [{
		type: Schema.Types.ObjectId,
		ref: 'User'
	}],
    challenges: [{
        type: Schema.Types.ObjectId,
        ref: 'Challenge'
    }],
    picture: {
		type: String,
		trim: true
	},
    createdOn: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model( 'Team', teamSchema );
