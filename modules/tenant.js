
'use strict'

const schema = require('../schema/schema')

/**
 * This module gets all the tenants added to the database!
 * @return {Promise<object|Error>} All tenants in the database.
 */
exports.getTenants = () => new Promise( (resolve, reject) => {
	schema.Tenant.find({}, (err, tenants) => {
		if (err) reject(new Error('database error'))
		if (tenants.length) resolve(tenants) 
		reject(new Error('No tenants'))
	})
})

/**
 * This module takes in the tenantname and finds it in the database!
 * @param {string} tenantName - the name of tenant you which to search.
 * @return {Promise<object|Error>}  searched user.
 */
exports.getTenant = tenantName => new Promise( (resolve, reject) => {
	schema.Tenant.find({name: tenantName}, (err, tenants) => {
		if (err) reject(new Error('database error'))
		if (tenants.length){
			console.log(tenants.length)
			console.log(tenants[0].age)
			resolve(tenants)
		}
		reject(new Error('Tenant doesnot exist'))
	})
})

/**
 * This module takes in new tenant information and post it to the database!
 * @param {object} tenantInfo - The tenant details.
 * @return {Promise<object|Error>} message: Tenant successfully created! & new user.
 */
exports.postTenant = tenantInfo => new Promise( (resolve, reject) => {
	const tenant = new schema.Tenant(tenantInfo)

	tenant.save( (err, tenant) => {
		if (err) reject(new Error('an error add tenant to system'))
		resolve({message: 'Tenant successfully created!', tenantInfo})
	})
})

/**
 * This module takes finds details of the tenant you wish updates it in the database!
 * @param {string} tenantName - The name of existing tenant
 * @param {string} tenantAge - The new age of the tenant.
 * @param {boolean} payed - add payment status of tenant.
 * @return {Promise<object|Error>} message : Tenant successfully updated & updated details.
 */
exports.updateTenant = (tenantName, tenantAge, payed) => new Promise( (resolve, reject) => {
	schema.Tenant.findOneAndUpdate({name: tenantName}, {$set: {age: tenantAge, isPayed: payed}}, {new: true}, (err, tenant) => {
		if (err) reject(new Error('an error updating tenant data'))
		resolve({ message: 'Tenant successfully updated!', tenant })
	})
 })

/**
 * This module finds and delete a tenant from the database!
 * @param {string} tenantName - The name of existing tenant .
 * @return {Promise<object|Error>} message: Tenant successfully deleted!.
 */
exports.deleteTenant = tenantName => new Promise( (resolve, reject) => {
	schema.Tenant.find({name: tenantName}).remove( (err) => {
		if (err) return reject(err)
		resolve({ message: 'Tenant successfully deleted!' })
	})
})

/**
 * This module returns all tenants that have paid or not paid!
 * @param {boolean} payed - The payment status of tenant .
 * @return {Promise<object|Error>} Tenants!.
 */
exports.isPayed = payed => new Promise( (resolve, reject) => {
	schema.Tenant.find({isPayed: payed}, (err, tenants) => {
		if (err) reject(new Error('database error'))
		if (!tenants.length) reject(new Error('Tenant doesnot exist'))
		resolve(tenants)

	})
})

