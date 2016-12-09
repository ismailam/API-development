
'use strict'

const schema = require('../schema/schema');



exports.getTenants = tenantName => new Promise( (resolve, reject) => {
	schema.Tenant.find({name: tenantName}, (err, tenants) => {
		if (err) reject(new Error('database error'))
		if (tenants.length) resolve(tenants) 
		reject(new Error('No tenants'))
		
	})
})



exports.getTenant = tenantName => new Promise( (resolve, reject) =>{
	schema.Tenant.find({name: tenantName}, (err, tenants) =>  {
		if (err) reject(new Error('database error'))
		if (tenants.length){
			console.log(tenants.age)
			resolve(tenants)
			
		}
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
	console.log(`tenantName: ${tenantName}`)
	schema.Tenant.find({name: tenantName}).remove( (err) => {
		console.log('ERR')
		console.log(err)

		if (err) return reject(err)
		resolve({ message: 'Tenant successfully deleted!' })
	})
})


exports.Count = callback => {
	schema.Tenant.count({}, (err, count) => {
		if (err) {
			callback(err)
			
		}
		callback(null, count)
	})
}

//checks if tenant has payed rent
exports.isPayed = payed => new Promise( (resolve, reject) => {
	schema.Tenant.find({isPayed : payed}, (err, tenants) =>  {
		if (err) reject(new Error('database error'))
		if (!tenants.length) reject(new Error(`Tenant doesnot exist`))
		resolve(tenants)
	
		
  });
})



