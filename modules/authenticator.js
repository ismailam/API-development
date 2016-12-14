'use strict'
const passport = require('passport')
const BasicStrategy = require('passport-http').BasicStrategy
const userschema = require('../schema/userSchema')


passport.use(new BasicStrategy(
/** 
 * For our BasicStrategy, we are defining a callback that will attempt to look up the user using the provided username and if found see if the password is correct
 * What we are doing here is setting up passport to use the Basic authentication stategy provided by the passport-http package
 * If all works well, it will call the callback method and provide the found user
 * @param {string} username - username for each request
 * @param {string} password - password for the user
 * @param {null} callback - grants access 
 * @return {boolean} grants or denies access.
 */
    function(username, password, callback){
      userschema.User.findOne({ username: username }, (err, user) => {
      if (err) return callback(err)
      /** No user found with that username*/
      if (!user) return callback(null, false) 

      /** Make sure the password is correct*/
      user.verifyPassword(password, function(err, isMatch) {
        if (err) return callback(err)

        /** checks password did  matche*/
        if (!isMatch) return callback(null, false)
        // Success
        return callback(null, user)
      })
    })
  }
))

 /**The final piece of this is exporting the isAuthenticated function which tells passport to authenticate using our BasicStrategy.
 * The option of session being set to false tells passport to not store session variables between calls to our API
 * This forces the user to submit the username and password on each call
 */
exports.isAuthenticated = passport.authenticate('basic', {session: false })


