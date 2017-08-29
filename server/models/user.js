const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

// model definition
const userSchema = new Schema({
  name : String,
  username: { type: String, unique: true, lowercase: true },
  password: String,
  role: String,
  status : {type: Boolean, default : 0 } 
});

// Before saving a model, encrypt the password
userSchema.pre('save', function(next) {
  // get access to the user model
  const user = this;
  // generate a salt then run callback
  bcrypt.genSalt(10, function(err, salt) {
    if (err) { return next(err); }
    // hash (encrypt) our password using the salt
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) { return next(err); }
      // overwrite plain text password with encrypted password
      user.password = hash;
      next();
    });
  });
});



//to be used in passport.js
userSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) { return callback(err); }

    callback(null, isMatch);
  });
}



//Default data for admin
const ModelClass = mongoose.model('user', userSchema);
var adminData  =  new ModelClass({name :  "Admin" , username : "admin@123" , password : "admin@123" , role : "admin", status : 1 });
ModelClass.findOne({ username: 'admin@123' }, function(err, existingUser) {

    if(!existingUser){
      adminData.save(function(err){
          if ( err ) throw err;
          console.log("Book Saved Successfully");
      });
    }else{
      console.log("Default goes in else condition");
    }

});

// Export the model
module.exports = ModelClass;
