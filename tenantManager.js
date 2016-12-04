'use strict'

const persistence = require('./modules/persistence')
const auth = require('./modules/authenticator');



//shows one tenant
exports.showTenant = (callback) => {
	persistence.getTenant(' mansaray Ismail')
	.then(tenants => {
		callback(null, tenants)
	}).catch(err => {
		callback(err)
	})
}


//shows tenant
exports.showTenants = (callback)=> {
	persistence.getTenant()
	.then(tenants => {
		callback(null, tenants)
	}).catch(err => {
		callback(err)
	})
}

//add tenant
exports.addTenant = (request, callback) => {
	extractBodyKey(request, 'name').then( (name, location, age, userId) => {
		const tenantI= {
			name: request.body.name,
			location: request.body.locations,
			age: request.body.age
			userId: request.user._id;
		}
		console.log(tenantI);
		return persistence.postTenant(tenantI)
	}).then( data => callback(null, data))
	.catch( err => callback(err))
}

//update tenant	
exports.putTenant = (request, callback) => {
	extractBodyKey(request, 'age').then( (age, location) => {
		const tenantI= {
			age: request.body.age,
			location: request.body.locations
			
		}
		console.log(tenantI);
		return persistence.putTenant(tenantI)
	}).then( data => callback(null, data))
	.catch( err => callback(err))
}



/* *************************** adds users and shows users *******************/
//show users
exports.showUsers = (callback)=> {
	persistence.getUsers()
	.then(users => {
		callback(null, users)
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
		return persistence.postUser(userI)
	}).then( data => callback(null, data))
	.catch( err => callback(err))
}
	
	
	
	
	
	
	

/* *************************** helpwe functions *******************/    
//helper functions
const extractBodyKey = (request, key) => new Promise( (resolve, reject) => {
	if (request.body === undefined || request.body[key] === undefined) reject(new Error(`missing key ${key} in request body`))
	resolve(request.body[key])
})





