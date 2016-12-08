'use strict'

const persistence = require('./modules/persistence')
const location = require('./modules/location')
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
	extractBodyKey(request, 'name').then( (tenantId, name, location, age, isPayed) => {
		const tenantI= {
			tenantId: rand(130, 36),
			name: request.body.name,
			location: request.body.locations,
			age: request.body.age,
			isPayed: request.body.isPayed
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




/****************** additional features **
 *											***show tenant location detailas ****************************/


//details of tenants location
exports.tenantsLocation = (callback)=> {
	const locations = " 7 Gilbert Close Coventry ";
	location.getLocation(locations)
	.then(tenantlocation => {
		callback(null, tenantlocation)
	}).catch(err => {
		callback(err)
	})
}

//shows tenants distance from agency
exports.tenantsDistance = (callback)=> {
	const agencyLocation = "7 Gilbert Close Coventry";
	const tenantsLocation = "3 Vecqueray St, Coventry "
	
	location.distanceFromAgency(agencyLocation, tenantsLocation)
	.then(tenantdistance => {
		callback(null, tenantdistance)
	}).catch(err => {
		callback(err)
	})
}


//shows tenants direction from agency
exports.tenantsDirection = (callback)=> {
	const agencyLocation = "CV1 5JQ";
	const tenantsLocation = "CV1 5FB"
	
	location.directionFromAgency(agencyLocation, tenantsLocation)
	.then(tenantdirection => {
		callback(null, tenantdirection)
	}).catch(err => {
		callback(err)
	})
}

//shows users that have paid rent 
exports.tenantIsPayed = (callback) => {
	persistence.isPayed()
	.then(tenants => {
		callback(null, tenants)
	}).catch(err => {
		callback(err)
	})
} 


/******************************************************************************/


	

/* *************************** helpwe functions *******************/    
//helper functions
const extractBodyKey = (request, key) => new Promise( (resolve, reject) => {
	if (request.body === undefined || request.body[key] === undefined) reject(new Error(`missing key ${key} in request body`))
	resolve(request.body[key])
})





