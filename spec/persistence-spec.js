
'use strict'
/*istanbul ignore next*/
/* global expect */

const persistence = require('../modules/persistence');
const schema = require('../schema/schema')

describe('removes, add, count tenant collection', () => {
	beforeEach( done => {
		schema.Tenant.remove({}, err => {
			if (err) expect(true).toBe(false)
			new schema.Tenant({name: 'munirah', age: 16, location: 'coventry'}).save( (err, tenant) => {
				if (err) expect(true).toBe(false)
				schema.Tenant.count({}, (err, count) => {
					if (err) expect(true).toBe(false)
					expect(count).toBe(8)
					done()
				})
			})
		})
	})
	
	
})
