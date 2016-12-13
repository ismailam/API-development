// Load required packages

'use strict'
const passport = require('passport')
const BasicStrategy = require('passport-http').BasicStrategy
const userschema = require('../schema/userSchema')

passport.use(new BasicStrategy(
  function(username, password, callback) {
    userschema.User.findOne({ username: username }, (err, user) => {
        if (err) { return callback(err); }
      // No user found with that username
      if (!user) { return callback(null, false); } 

      // Make sure the password is correct
      user.verifyPassword(password, function(err, isMatch) {
        if (err) { return callback(err); }
        
        // Password did not match
        if (!isMatch) { return callback(null, false); } 

        // Success
        return callback(null, user);
      });
    });
  }
));

exports.isAuthenticated = passport.authenticate('basic', { session : false });



	// .then((tenants)=> {
	// 	const tenantLocation = request.body.locations;
	// 	const agencyLocation = "3 Vecqueray St, Coventry";
	// 	return locations.distanceFromAgency(agencyLocation, tenantLocation)
	// })