'use strict'

const persistence = require('./modules/persistence')
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


//shows one tenant
// exports.showTenant = (request, callback) => {
	
// 	persistence.getTenant()
// 	.then(tenants => {
// 		callback(null, tenants)
// 	}).catch(err => {
// 		callback(err)
// 	})
// }

//shows tenant
exports.showTenants = (callback)=> {
	persistence.getTenant()
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




/****************** additional features **
 *											***show tenant location detailas ****************************/


//details of tenants location
exports.tenantsLocation = (callback)=> {
	const locations = " 7 Gilbert Close Coventry ";
	locations.getLocation(locations)
	.then(tenantlocation => {
		callback(null, tenantlocation)
	}).catch(err => {
		callback(err)
	})
}


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
function tenantsDistance (request, callback) {
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



/******************************************************************************/


	

/* *************************** helpwe functions *******************/    
//helper functions
const extractBodyKey = (request, key) => new Promise( (resolve, reject) => {
	if (request.body === undefined || request.body[key] === undefined) reject(new Error(`missing key ${key} in request body`))
	resolve(request.body[key])
})





