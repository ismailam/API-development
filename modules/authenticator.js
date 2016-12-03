// Load required packages
var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;
var User = require('../schema/userSchema');
var bcrypt = require('bcrypt-nodejs');



exports.getHeaderCredentials = request => new Promise( (resolve, reject) => {
	if (request.authorization === undefined || request.authorization.basic === undefined) {
		reject(new Error('authorization header missing'))
	}
	const auth = request.authorization.basic

	if (auth.username === undefined || auth.password === undefined) {
		reject(new Error('missing username / password'))
	}
	resolve({username: auth.username, password: auth.password})
})



exports.hashPassword = credentials, salt, null => new Promise( (resolve, reject) => {
  bcrypt.genSalt(5, (salt) => {
    if (err) reject(new Error('could genSalt'))
    bcrypt.hash(credentials.password, salt, null, (err, hash) => {
      if (err) reject(new Error('cant hash'));
      credentials.password = hash;

      
    });
  }) 
  resolve(credentials)
  
})



exports.verifyPassword = (provided, stored) => new Promise( (resolve, reject) => {
  passport.use(new BasicStrategy(
    if (!bcrypt.compareSync(provided, stored)) {
      reject(new Error('invalid password'))
    }
    resolve()
    ))
})

exports.isAuthenticated = passport.authenticate('basic', { session : false });
