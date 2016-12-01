'use strict'

const persistence = require('./modules/persistence')


// // functions 
exports.showTenants = callback => {
    persistence.getTenant('musa').then(tenants => {
		callback(null, tenants)
	}).catch(err => {
		callback(err)
	})
    
	    
}

exports.addTenant = (request, callback) => {
	extractBodyKey(request, 'name').then( name => {
		this.name = name
		
		console.log(`name: ${name}`);
		return persistence.postTenant(name)
	}).then( data => callback(null, data))
	.catch( err => callback(err))
}
	
	








//helper functions
const extractBodyKey = (request, key) => new Promise( (resolve, reject) => {
	if (request.body === undefined || request.body[key] === undefined) reject(new Error(`missing key ${key} in request body`))
	resolve(request.body[key])
})









