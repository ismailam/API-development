
'use strict'
/*istanbul ignore next*/
/* global expect */

const persistence = require('../modules/persistence');
const schema = require('../schema/schema')

describe('removes, adds, counts tenant collection', () => {
	beforeEach( done => {
		schema.Tenant.remove({}, err => {
			if (err) expect(true).toBe(false)
			new schema.Tenant({name: 'munirah', age: 16, location: 'coventry'}).save( (err, tenant) => {
				if (err) expect(true).toBe(false)
				schema.Tenant.count({}, (err, count) => {
					if (err) expect(true).toBe(false)
					expect(count).toBe(1)
					done()
				})
			})
		})
	})
	
	
	describe('add', () => {
		it('should add a new Tenant', done => {
			const tenantI = {
				name: 'isa', 
				age: 16,
				location: 'coventry'
				
			}

			persistence.postTenant(tenantI, (err, tenant) => {
			    if (err) expect(true).toBe(false)
				schema.Tenant.count({}, (err, count) => {
					if (err) expect(true).toBe(false)
					expect(count).toBe(2)
					done()
				})
			})
		})
	})

})
