var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var submissionSchema = new Schema({
	submission: String,
	contentType: String,
	comment: {
		type: String,
		trim: true
	},
	user: {	
		type: Schema.Types.ObjectId,
		ref: 'User'
    },
    userName: String,
	challenge: {	
		type: Schema.Types.ObjectId,
		ref: 'Challenge'
    },
    team: {	
		type: Schema.Types.ObjectId, 
		ref: 'Team'
	},
    createdOn: {
		type: Date,
		default: Date.now
	}
});

submissionSchema.index({ user: 1, challenge: 1 }, { unique: true });

module.exports = mongoose.model( 'Submission', submissionSchema );