
'use strict'

const schema = require('../schema/schema')

exports.getTenants = new Promise( (resolve, reject) => {
	schema.Tenant.find((err, tenants) => {
		if (err) reject(new Error('database error'))
		if (!tenants.length) reject(new Error('No tenants'))
		resolve(tenants)
	})
})



exports.getTenant = tenant => new Promise( (resolve, reject) =>  {
  schema.User.find({name: tenant.name}, (err, docs) =>  {
    if (err) reject(new Error('database error'))
		if (docs.length) resolve(docs)
		reject(new Error(`Tenant doesnot exist`))
  });
});





exports.addTenant = tenantInfo => new Promise( (resolve, reject) => {
    const tenant = new schema.Tenant(tenantInfo)

	tenant.save( (err, tenant) => {
		if (err) {
			reject(new Error('an error add tenant to system'))
		}
		resolve({message: 'Tenant successfully created!', data: tenant})
	})
});


exports.updateTenant = tenantName => new Promise( (resolve, reject) =>{
    schema.Tenant.find({name: tenantName}, (err, tenant) => {
        if (err) reject(new Error('database error'))
		if (!tenant.length) reject(new Error('No tenant unavailable'));
		
		tenant = new schema.Tenant(tenantName)
	
        // Save the tenantData and check for errors
    	tenant.update( (err, tenant) => {
    		if (err) {
    			reject(new Error('an error updating tenant data'))
    		}
    		resolve({ message: 'Tenant successfully updated!', data: tenant })
    	})
		
    })
    
})


exports.deleteTenant = tenantName => new Promise( (resolve, reject) => {
    schema.Tenant.find({name: tenantName}, (err, tenants) => {
		if (err) reject(new Error('database error'))
		if (!tenants.length) reject(new Error('No tenants'));
		
		const tenant = new schema.Tenant(tenantDetails)
	
        // Save the tenantData and check for errors
    	tenant.remove( (err, tenant) => {
    		if (err) {
    			reject(new Error('an error deleting tenant data'))
    		}
    		resolve({ message: 'Tenant successfully deleted!', data: tenant })
    	})

	})
    
})






exports.accountExists = account => new Promise( (resolve, reject) => {
	schema.User.find({username: account.username}, (err, docs) => {
		if (docs.length) reject(new Error(`username already exists`))
		resolve()
	})
})


