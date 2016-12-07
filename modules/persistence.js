
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







exports.updateTenant = (tenantName, tenantAge) => new Promise( (resolve, reject) =>{
	schema.Tenant.findOneAndUpdate({name: tenantName}, {$set:{age:tenantAge}}, {new: true}, (err, doc) =>{
		if (err) {
			console.log(err)
			reject(new Error('an error updating tenant data'))
			
		}
		resolve({ message: 'Tenant successfully updated!', doc })
	})

	
 })





exports.deleteTenant = tenantName => new Promise( (resolve, reject) => {
	schema.Tenant.remove( {},(err) =>{
		if (err) {
    			reject(new Error('an error deleting tenant data'))
     		}
     		resolve({ message: 'Tenant successfully deleted!'})
	} )
})



exports.Count = callback => {
	schema.Tenant.count({}, (err, count) => {
		if (err) {
			callback(err)
			
		}
		callback(null, count)
	})
}


// exports.removeTenant = tenantName => new Promise( (resolve, reject) => {
// 	console.log(`tenantName: ${tenantName}`)
// 	schema.List.find({name: tenantName}).remove( (err,result) => {
// 		console.log('ERR')
// 		console.log(err)
// 		if (err) return reject(err)
// 		resolve(result)
// 	})
// })




/******************* post users  ****************************/
/********************USER REGISTRATION *************************/
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



