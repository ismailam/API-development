
'use strict'
/*istanbul ignore next*/
/* global expect */

const persistence = require('../modules/persistence');
const schema = require('../schema/schema');

describe('tenant collection', () => {
	beforeEach( done => {
		schema.Tenant.remove({}, err => {
			if (err) expect(true).toBe(false)
			const tenantI = {
				name: 'kundra', 
				age: 189,
				location: 'watford'
				
			}
			new schema.Tenant(tenantI).save( (err, tenant) => {
				if (err) expect(true).toBe(false)
					schema.Tenant.count({}, (err, count) => {
					if (err) expect(true).toBe(false)
					expect(count).toBe(1)
					done()
				})
			})
		
		})
	})
	
	describe('remove', () => {
		it('- existing tenant', done => {
			persistence.removeTenant('kundra').then( () => {
				schema.Tenant.count({}, (err, count) => {
					if (err) expect(true).toBe(false)
					expect(count).toBe(0)
					done()
				})
				
			})
			.catch( err => {
				if (err){
					console.log(err);
					expect(true).toBe(false)
				} 
				done()
			})
		})
	})
	
	describe('add', () => {
		it('+ new tenant', done => {
			const tenantI = {
				name: 'jafru', 
				age: 16,
	 			location: 'coventry'
				
			}
			persistence.postTenant(tenantI).then( () => {
				schema.Tenant.count({}, (err, count) => {
					if (err) expect(true).toBe(false)
					expect(count).toBe(2)
					done()
				})
				
			})
			.catch( err => {
				if (err){
					console.log(err);
					expect(true).toBe(false)
				} 
				done()
			})
		})
	})
	

})
