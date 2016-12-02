'use strict'

// import the mongoose package
const mongoose = require('mongoose')
const db = {
	user: 'ismailam',
	pass: '38055322abba'
}
//mongodb://<dbuser>:<dbpassword>@ds161487.mlab.com:61487/tenantdb

mongoose.connect('mongodb://ismailam:38055322abba@ds161487.mlab.com:61487/tenantdb'
);
mongoose.Promise = global.Promise
const Schema = mongoose.Schema

// create a schema
const tenantSchema = new Schema({
	name: String,
	tenantId: Number,
	age: Number,
	Email: String,
	location: Object,
	phoneNumber: Number,
	roomNumber: Number,
	rentAmount: Number,
	startDate: Date,
	endDate: Date
	
	
})

// create a model using the schema
exports.Tenant = mongoose.model('Tenant', tenantSchema)

// Define our user schema
var UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});


19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
// Load required packages
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

// Define our user schema
var UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

// Execute before each user.save() call
UserSchema.pre('save', function(callback) {
  var user = this;

  // Break out if the password hasn't changed
  if (!user.isModified('password')) return callback();

  // Password changed so we need to hash it
  bcrypt.genSalt(5, function(err, salt) {
    if (err) return callback(err);

    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) return callback(err);
      user.password = hash;
      callback();
    });
  });
});

// Export the Mongoose model
module.exports = mongoose.model('User', UserSchema);