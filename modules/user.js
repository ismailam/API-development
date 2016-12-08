
const userschema = require('../schema/userSchema');


/******************* post users  ****************************/
/********************USER REGISTRATION *************************/

exports.postUser = userInfo => new Promise( (resolve, reject) => {
	const user = new userschema.User(userInfo)
	
	user.save( (err, userI) => {
		if (err) {
			console.log(err)
			reject(new Error('an error adding user to system'))
		}
		resolve({message: 'Tenant successfully created!', userI})
	})
});




exports.getUsers = userName => new Promise( (resolve, reject) =>{
	userschema.User.find({username: userName}, (err, users) =>  {
		if (err) {
			console.log(err)
			reject(new Error('database error'))
			
		}
		if (users.length) {
			console.log(users)
			resolve(users)
			
		}
		reject(new Error('user doesnot exist'))
  });
});




//update password
exports.updatePassword = (userName, newPassword) => new Promise( (resolve, reject) =>{
	userschema.User.findOneAndUpdate({username: userName}, {$set:{password:newPassword}}, {new: true}, (err, doc) =>{
		if (err) {
			console.log(err)
			reject(new Error('an error updating user data'))
			
		}
		resolve({ message: 'user updated!', doc })
	})

	
 })
 



exports.deleteUser = userName => new Promise( (resolve, reject) => {
	console.log(`tenantName: ${userName}`)
	userschema.User.find({username: userName}).remove( (err) => {
		console.log('ERR')
		console.log(err)

		if (err) return reject(err)
		resolve({ message: 'User successfully deleted!' })
	})
})

