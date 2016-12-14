'use strict'
 
/**@constant {schema} */
const userschema= require('../schema/userSchema')


/**
 * This module takes in new user information and post it to the database!
 * @param {object} userInfo - The username and passsword of new user.
 * @return {Promise<object|Error>} message: user account created & new user.
 */
exports.postUser=userInfo => new Promise( (resolve, reject) => {
	const user = new userschema.User(userInfo)

	user.save( (err, userI) => {
		if (err) reject(new Error('an error adding user to system'))
		resolve({message: 'User Account created!', userI})
	})
})

/**
 * This module takes in the username you which to update, checks if its available in the database and modifies it!
 * @param {string} userName - The username already created.
 * @param {string} newPassword - The new password to update.
 * @return {Promise<object|Error>} message : user account updated & updated password.
 */
exports.updatePassword = (userName, newPassword) => new Promise( (resolve, reject) => {
	userschema.User.findOneAndUpdate({username: userName}, {$set: {password: newPassword}}, {new: true}, (err, doc) => {
		if (err) reject(new Error('an error updating user data'))
		resolve({ message: 'user updated!', doc })
	})
 })

/**
 * This module takes in the username and deletes it from a database!
 * @param {string} userName - The username already created.
 * @return {Promise<object|Error>} message: User successfully deleted!.
 */
exports.deleteUser = userName => new Promise( (resolve, reject) => {
	userschema.User.find({username: userName}).remove( (err) => {
		if (err) return reject(err)
		resolve({ message: 'User successfully deleted!' })
	})
})

