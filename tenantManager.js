'use strict'

const persistence = require('./modules/persistence')
const auth = require('./modules/authenticator');
const rand = require('csprng');

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
	extractBodyKey(request, 'name').then( (tenantId, name, location, age) => {
		const tenantI= {
			tenantId: rand(130, 36),
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
	persistence.deleteTenant('amir')
	.then(() => {
		console.log('deleted')
		return ('tenant deleted')
	}).catch(err => {
		callback(err)
	})
}




	

/* *************************** helpwe functions *******************/    
//helper functions
const extractBodyKey = (request, key) => new Promise( (resolve, reject) => {
	if (request.body === undefined || request.body[key] === undefined) reject(new Error(`missing key ${key} in request body`))
	resolve(request.body[key])
})





