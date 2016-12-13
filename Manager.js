'use strict'

const persistence = require('./modules/tenant')
const userPersistence = require('./modules/user')
const locations = require('./modules/location')
const rand = require('csprng')


//shows one tenant
exports.showTenant = (request, callback) => {
	persistence.getTenant(request.params.name)
	.then(tenants => {
		callback(null, tenants)
	}).catch(err => {
		callback(err)
	})
}


//shows tenants
exports.showTenants = (callback) => {
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
	.then( name => {
		this.name = name
		console.log(this.name)
		return extractBodyKey(request, 'age')
		//return locations.getLocation(request.body.locations);
	})
	.then( age => {
		this.age = age
		console.log(this.age)
		return extractBodyKey(request, 'isPayed')
	}).then( isPayed => {
		this.isPayed = isPayed
		console.log(this.isPayed)
		return extractBodyKey(request, 'locations')
	}).then(location => {
		this.locations = location
		return locations.getLocation(location)
	})
	
	.then((location)=> {
		const tenantLocation = location
		const agencyLocation = "3 Vecqueray St, Coventry";
		return locations.distanceFromAgency(agencyLocation, tenantLocation)
	})

	.then( (details) => {
		return persistence.postTenant({name : this.name, age : this.age, isPayed : this.isPayed, locationDetails: details, distance: distanceDetails })
	})
	.then( data => callback(null, data))
	.catch( err => callback(err))
}


// exports.putTenant = (request, callback) => {
// 	extractBodyKey(request, 'age').then( () => {
// 		const age = request.body.age

// 		return persistence.updateTenant('kundra', age)
// 	}).then( data => callback(null, data))
// 	.catch( err => callback(err))
// }

exports.putTenant = (request, callback) => {
	extractBodyKey(request, 'age').then( (age) => {
		this.age = age

		return persistence.updateTenant('kwais', this.age)
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


//shows tenants distance from agency
exports.tenantsDistance = (request, callback) => {
	const agencyLocation = '7 Gilbert Close Coventry'
	const tenantsLocation = request.body.locations

	locations.distanceFromAgency(agencyLocation, tenantsLocation)
	.then(tenantdistance => {
		callback(null, tenantdistance)
	}).catch(err => {
		callback(err)
	})
}

exports.payed = (callback) => {
	persistence.isPayed(true)
	.then(tenants => {
		callback(null, tenants)
	}).catch(err => {
		callback(err)
	})
} 


exports.notPayed = (callback) => {
	persistence.isPayed(false)
	.then(tenants => {
		callback(null, tenants)
	}).catch(err => {
		callback(err)
	})
} 


/********************** MANAGING USER REGISTRATION **************************************/


//show users
exports.showUsers = (callback) => {
	userPersistence.getUsers('amir').then(user => {
		callback(null, user)
	}).catch(err => {
		callback(err)
	})

}


// //add users
// exports.addUser = (request, callback) => {
// 	extractBodyKey(request, 'username').then( (username, password) => {
// 		const userI= {
// 			username: request.body.username,
// 			password: request.body.password
// 		}

// 		console.log(userI)
// 		return userPersistence.postUser(userI)
// 	}).then( data => callback(null, data))
// 	.catch( err => callback(err))
// }

// //add tenant
exports.addUser = (request, callback) => {
	extractBodyKey(request, 'username')
	.then( username => {
		this.username = username
		console.log(this.username)
		return extractBodyKey(request, 'password')

	})
	.then( password => {
		this.password = password
		console.log(this.password)
	
	})
	.then( () => {
		return userPersistence.postUser({username: this.username, password: this.password })
	})
	.then( data => callback(null, data))
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

const extractBodyKey = (request, key) => new Promise( (resolve, reject) => {
	if (request.body === undefined || request.body[key] === undefined) reject(new Error(`missing key ${key} in request body`))
	resolve(request.body[key])
})

