
'use strict'

const schema = require('../schema/schema');
const userschema = require('../schema/userSchema');


exports.getTenants = new Promise( (resolve, reject) => {
	schema.Tenant.find( (err, tenants) => {
		if (err) reject(new Error('database error'))
		if (tenants.length) resolve(tenants) 
		reject(new Error('No tenants'))
		
	})
})



exports.getTenant = tenantName => new Promise( (resolve, reject) =>{
	schema.Tenant.find({name: tenantName}, (err, tenants) =>  {
		if (err) reject(new Error('database error'))
		if (tenants.length) resolve(tenants)
		reject(new Error(`Tenant doesnot exist`))
  });
});





exports.postTenant = tenantInfo => new Promise( (resolve, reject) => {
	const tenant = new schema.Tenant(tenantInfo)
	
	tenant.save( (err, tenant) => {
		if (err) {
			reject(new Error('an error add tenant to system'))
		}
		resolve({message: 'Tenant successfully created!', tenantInfo})
	})
});




exports.updateTenant = tenantName => new Promise( (resolve, reject) =>{
	schema.Tenant.find({name: tenantName}, (err, tenant) => {
    	if (err) reject(new Error('database error'))
    	if (!tenant.length) reject(new Error('No tenant unavailable'));
    	
    	tenant = new schema.Tenant(tenantName)
    	// Save the tenantData and check for errors
    	tenant.update( (err, tenants) => {
    		if (err) {
    			reject(new Error('an error updating tenant data'))
    			
    		}
    		resolve({ message: 'Tenant successfully updated!', tenants })
    	})
		
    })
    
})




// exports.deleteTenant = tenantName => new Promise( (resolve, reject) => {
//     schema.Tenant.find({name: tenantName}, (err, tenants) => {
// 		if (err) reject(new Error('database error'))
// 		if (!tenants.length) reject(new Error('No tenants'));
		
// 		const tenant = new schema.Tenant(tenantDetails)
	
//         // Save the tenantData and check for errors
//     	tenant.remove( (err, tenant) => {
//     		if (err) {
//     			reject(new Error('an error deleting tenant data'))
//     		}
//     		resolve({ message: 'Tenant successfully deleted!', data: tenant })
//     	})

// 	})
    
// })

// this exported function returns how many documents
// there are in the MongoDB database
exports.count = callback => {
	schema.Tenant.count({}, (err, count) => {
		if (err) {
			callback(err)
			
		}
		callback(null, count)
	})
}


// this is an anonymous function that returns a promise.
exports.remove = tenantName => new Promise( (resolve, reject) => {
	schema.Tenant.find({name: tenantName}).remove( err => {
		if (err) return reject(err)
		resolve()
	})
})




/******************* post users  ****************************/
exports.postUser = userInfo => new Promise( (resolve, reject) => {
	const user = new userschema(userInfo)
	
	user.save( (err, userI) => {
		if (err) {
			reject(new Error('an error adding user to system'))
		}
		resolve({message: 'Tenant successfully created!', userI})
	})
});




exports.getUsers = new Promise( (resolve, reject) =>  {
	userschema.User.find((err, users) =>  {
		if (err) reject(new Error('database error'))
		if (users.length) resolve(users)
		reject(new Error(`user doesnot exist`))
  });
});


exports.count = callback => {
	schema.List.count({}, (err, count) => {
		if (err) {
			callback(err)
			
		}
		callback(null, count)
	})
}
