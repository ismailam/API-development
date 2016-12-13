'use strict'

const persistence = require('./modules/tenant')
const userPersistence = require('./modules/user')
const googleLocation = require('./modules/location')
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
		return googleLocation.getLocation(location)
	})
	.then((location)=> {
		this.details = location
		return extractBodyKey(request, 'locations')
	}).then(locations => {
		const tenantLocation = locations
		const agencyLocation = '3 Vecqueray St, Coventry'
		return googleLocation.distanceFromAgency(agencyLocation, tenantLocation)
	})
	.then( (distances) => {
		console.log(distances)
		this.id = rand(36, 7)
		return persistence.postTenant({tenantId : this.id, name: this.name, age: this.age, isPayed: this.isPayed, locationDetails: this.details, distance: distances})
	})
	.then( data => callback(null, data))
	.catch( err => callback(err))
}


exports.putTenant = (request, callback) => {
	extractBodyKey(request, 'age')
	.then( (age) => {
		this.age = age
		return extractBodyKey(request, 'isPayed')
	})
	.then( (isPayed) => {
		this.isPayed = isPayed
		return persistence.updateTenant('kwais', this.age, this.isPayed)
	})
	.then( data => callback(null, data))
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

// //update user
exports.putUser = (request, callback) => {
	extractBodyKey(request, 'password').then( (password) => {
		this.password = password

		return userPersistence.updatePassword('ummi', this.password)
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

