
'use strict'

const mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs')

/* Define our user schema*/
const UserSchema = new mongoose.Schema({
  username: {type: String, unique: true, required: true}, password: {type: String, required: true}
})

/** Execute before each user.save() call*/
UserSchema.pre('save', function(callback) {
  const user = this

  /**Break out if the password hasn't changed*/
  if (!user.isModified('password')) return callback();

  /**Password changed so we need to hash it*/
  bcrypt.genSalt(5, function(err, salt) {
    if (err) return callback(err)

    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) return callback(err)
      user.password = hash
      callback()
    })
  })
})
/**Before we make our auth controller, we need to update our User model to add a function capable of verifying a password in order to authenticate calls to the API**/
UserSchema.methods.verifyPassword = function(password, cb) {
  bcrypt.compare(password, this.password, function(err, isMatch) {
    if (err) return cb(err)
    cb(null, isMatch)
  })
}

/**Export the Mongoose model*/
exports.User = mongoose.model('User', UserSchema)