
'use strict'

const schema = require('../schema/schema');
const userschema = require('../schema/userSchema');
var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;



exports.getTenants = new Promise( (resolve, reject) => {
	schema.Tenant.find((err, tenants) => {
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




// exports.updateTenant = tenantName => new Promise( (resolve, reject) =>{
//     schema.Tenant.find({name: tenantName}, (err, tenant) => {
//     	if (err) reject(new Error('database error'))
//     	if (!tenant.length) reject(new Error('No tenant unavailable'));
    	
//     	tenant = new schema.Tenant(tenantName)
//     	// Save the tenantData and check for errors
//     	tenant.update( (err, tenant) => {
//     		if (err) {
//     			reject(new Error('an error updating tenant data'))
    			
//     		}
//     		resolve({ message: 'Tenant successfully updated!', data: tenant })
//     	})
		
//     })
    
// })




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





exports.postUsers = credentials => new Promise( (resolve, reject) => {
	const user = new userschema(credentials)
	user.save( (err, user) => {
		if (err) {
			reject(new Error('error creating account'))
		}
		resolve(credentials)
	})
})


exports.getUsers = accountUsername => new Promise( (resolve, reject) =>  {
	userschema.User.find({username: accountUsername}, (err, users) =>  {
		if (err) reject(new Error('database error'))
		if (users.length) resolve(users)
		reject(new Error(`user doesnot exist`))
  });
});


//authentication
exports.getCredentials = credentials => new Promise( (resolve, reject) => {
	passport.use(new BasicStrategy(
		schema.User.find({username: credentials.username}, (err, docs) => {
			if (err) reject(new Error('database error'))
			if (docs.length) resolve(docs)
			reject(new Error('invalid username'))
			
		});
		))
	
}))
	


