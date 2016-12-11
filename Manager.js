'use strict'

const persistence = require('./modules/tenant')
const userPersistence = require('./modules/user')
const locations = require('./modules/location')
const auth = require('./modules/authenticator');
const rand = require('csprng');



//shows one tenant
exports.showTenant = (callback) => {
	persistence.getTenant('salma')
	.then(tenants => {
		callback(null, tenants)
	}).catch(err => {
		callback(err)
	})
}



//shows tenants
exports.showTenants = (callback)=> {
	persistence.getTenants()
	.then(tenants => {
		callback(null, tenants)
	}).catch(err => {
		callback(err)
	})
}

// //add tenant
exports.addTenant = (request, callback) => {
	extractBodyKey(request, 'name')
	.then(()=>{
		return locations.getLocation(request.body.locations);
	})
	// .then((tenants)=> {
	// 	const tenantLocation = request.body.locations;
	// 	const agencyLocation = "3 Vecqueray St, Coventry";
	// 	return locations.distanceFromAgency(agencyLocation, tenantLocation)
		
	// })

	.then( (locations,tenantId, name, age, isPayed) => {
		const tenantI= {
			tenantId: rand(130, 36),
			name: request.body.name,
			age: request.body.age,
			isPayed: request.body.isPayed,
			location: locations,
			added: new Date()
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
exports.removeTenant = (request, callback) => {
	persistence.deleteTenant('kundra')
	.then( data => callback(null, data))
	.catch(err => {
		callback(err)
	})
}




/****************** additional features ****************************************************/

//details of tenants location
exports.tenantsLocation = (request, callback)=> {
	locations.getLocation(request.body.locations)
	.then(tenantlocation => {
		callback(null, tenantlocation)
	}).catch(err => {
		callback(err)
	})
}

//shows tenants distance from agency
exports.tenantsDistance = (request, callback) => {
	const agencyLocation = "7 Gilbert Close Coventry";
	const tenantsLocation = request.body.locations
	
	locations.distanceFromAgency(agencyLocation, tenantsLocation)
	.then(tenantdistance => {
		callback(null, tenantdistance)
	}).catch(err => {
		callback(err)
	})
}



//shows users that have paid rent 
exports.payed = (callback) => {
	persistence.isPayed(true)
	.then(tenants => {
		callback(null, tenants)
	}).catch(err => {
		callback(err)
	})
} 


//shows users that have not paid for rent 
exports.notPayed = (callback) => {
	persistence.isPayed(false)
	.then(tenants => {
		callback(null, tenants)
	}).catch(err => {
		callback(err)
	})
} 



/********************** 		MANAGING USER 
											REGISTRATION **************************************/


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





