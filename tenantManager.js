'use strict'

const persistence = require('./modules/persistence')
const auth = require('./modules/authenticator');

//' mansaray Ismail'

//shows one tenant
exports.showTenant = (callback) => {
	persistence.getTenant('kundra')
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
	extractBodyKey(request, 'name').then( (name, location, age) => {
		const tenantI= {
			name: request.body.name,
			location: request.body.locations,
			age: request.body.age,
		}
		console.log(tenantI);
		return persistence.postTenant(tenantI)
	}).then( data => callback(null, data))
	.catch( err => callback(err))
}

//update tenant	data 
exports.putTenant = (request, callback) => {
	extractBodyKey(request, 'age').then( () => {
		
		const age = request.body.age
		
		return persistence.updateTenant('kundra', age)
	}).then( data => callback(null, data))
	.catch( err => callback(err))
}

//deletes tenant
exports.removeTenant = (callback) => {
	persistence.deleteTenant()
	.then(tenants => {
		callback(null, tenants)
	}).catch(err => {
		callback(err)
	})
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





