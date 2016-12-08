const userPersistence = require('./modules/user')


/* *************************** adds users and shows users *******************/
//show users
exports.showUsers = (callback)=> {
	userPersistence.getUsers("amir").then(user => {
		callback(null, user)
	}).catch(err => {
		callback(err)
	})
	
}







//add users
exports.addUser = (request, callback) => {
	extractBodyKey(request, 'username').then( (username, password) => {
		const userI= {
			username: request.body.username,
			password: request.body.password
		}
		console.log(userI);
		return userPersistence.postUser(userI)
	}).then( data => callback(null, data))
	.catch( err => callback(err))
}
	

//update user
exports.putUser = (request, callback) => {
	extractBodyKey(request, 'password').then( () => {
		const password = request.body.password
		return userPersistence.updatePassword('amir', password)
	}).then( data => callback(null, data))
	.catch( err => callback(err))
}
	
	
//deletes tenant
exports.removeUser = (request, callback) => {
	userPersistence.deleteUser('amir')
	.then( data => callback(null, data))
	.catch(err => {
		callback(err)
	})
}







/* *************************** helpwe functions *******************/    
//helper functions
const extractBodyKey = (request, key) => new Promise( (resolve, reject) => {
	if (request.body === undefined || request.body[key] === undefined) reject(new Error(`missing key ${key} in request body`))
	resolve(request.body[key])
})

	