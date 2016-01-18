var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

//email syntax validation
var emailValidator = [
    function(email) {
        var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return re.test(email);
    },
    //error message
    'Email address is invalid'
  ];

var userSchema = new Schema({
    fullName: String,
    userName: String,
    password: String,
    email: {  
    type: String,
    trim: true,
    index: {
      unique: true
      },
    validate: emailValidator
    },
    teams: [{ 
    type: Schema.Types.ObjectId, 
    ref: 'Team'
    }],
    points: {
        type: Number,
        min: 0
    },
    completedChallenges: [{
        type: Schema.Types.ObjectId,
        ref: 'Challenge'
    }],
    submissions: [{
        type: Schema.Types.ObjectId,
        ref: 'Submission'
    }],
    picture: {
      type: String,
      trim: true
    },
    createdOn: {
      type: Date,
      default: Date.now
    },
    facebookId: String,
});

userSchema.methods.toJSON = function() {
  var user = this.toObject();
  delete user.password;
  return user;
};

userSchema.methods.comparePasswords = function(password, callback) {
  bcrypt.compare(password, this.password, callback); 
};

userSchema.pre('save', function(next) {

  var user = this;
 
  if ( !user.isModified('password') ) {
    return next();
  }
 
  bcrypt.genSalt(10, function(err, salt) {
    if (err) {
      return next(err);
    }
     
    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
  
});

module.exports = mongoose.model( 'User', userSchema );
