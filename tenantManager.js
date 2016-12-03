'use strict'

const persistence = require('./modules/persistence')


// // functions 
exports.showTenant = callback => {
    persistence.getTenant(' mansaray Ismail').then(tenants => {
		callback(null, tenants)
	}).catch(err => {
		callback(err)
	})
    
	    
}

exports.showTenants = callback => {
    persistence.getTenant().then(tenants => {
		callback(null, tenants)
	}).catch(err => {
		callback(err)
	})
    
	    
}

exports.addTenant = (request, callback) => {
	extractBodyKey(request, 'name').then( (name, location, age) => {
		const tenantI= {
			name: request.body.name,
			location: request.body.locations,
			age: request.body.age
		}
		console.log(tenantI);
		return persistence.postTenant(tenantI)
	}).then( data => callback(null, data))
	.catch( err => callback(err))
}
	
//Model Crud user
exports.addUser = (request, callback) => {
	extractBodyKey(request, 'username').then( (username, password) => {
		const userI= {
			username: request.body.username,
			password: request.body.password
			
		}
		console.log(userI);
		return persistence.postUsers(userI)
	}).then( data => callback(null, data))
	.catch( err => callback(err))
}
	

exports.showUser = callback => {
    persistence.getUsers('root').then(users => {
		callback(null, users)
	}).catch(err => {
		callback(err)
	})
    
	    
}







//helper functions
const extractBodyKey = (request, key) => new Promise( (resolve, reject) => {
	if (request.body === undefined || request.body[key] === undefined) reject(new Error(`missing key ${key} in request body`))
	resolve(request.body[key])
})









