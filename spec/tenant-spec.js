
'use strict'


/*istanbul ignore next*/
/* global expect */
/* global describe*/
const persistence = require('../modules/tenant')
const schema = require('../schema/schema')

describe('tenant collection', () => {
	beforeEach( done => {
		schema.Tenant.remove({}, err => {
			if (err) expect(true).toBe(false)
			const tenantI = {name: 'kundra', age: 189,location: 'watford',isPayed: 'true'}

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
	
	describe('get', () => {
		it(' show all users', done => {
			persistence.getTenants().then( () => {
				schema.Tenant.count({}, (err, count) => {
					if (err) expect(true).toBe(false)
					expect(count).toBe(1)
					done()
				})

			})
		.catch( err => {
			if (err) expect(true).toBe(false)
			done()

		})
		})

	})

	describe('get', () => {
		it(' show one tenant', done => {
			persistence.getTenant('kundra').then( () => {
				schema.Tenant.count({}, (err, count) => {
					if (err) expect(true).toBe(false)
					expect(count).toBe(1)
					done()
				})

			})
		.catch( err => {
			if (err) expect(true).toBe(false)
			done()

		})
		})

	})


	describe('remove', () => {
		it('- existing tenant', done => {
			persistence.deleteTenant('kundra').then( () => {
				schema.Tenant.count({}, (err, count) => {
					if (err) expect(true).toBe(false)
					expect(count).toBe(0)
					done()
				})

			})
			.catch( err => {
				if (err) expect(true).toBe(false)
				done()
			})
		})
	})

	describe('add', () => {
		it('+ new tenant', done => {
			const tenantI = {name: 'jafru', age: 16, location: 'coventry'}

			persistence.postTenant(tenantI).then( () => {
				schema.Tenant.count({}, (err, count) => {
					if (err) expect(true).toBe(false)
					expect(count).toBe(2)
					done()
				})

			})
			.catch( err => {
				if (err) expect(true).toBe(false)
				done()
			})
		})
	})

	describe('update', () => {
		it(' modify tenant', done => {
			persistence.updateTenant('kundra', 16).then( () => {
				schema.Tenant.count({}, (err, count) => {
					if (err) expect(true).toBe(false)
					expect(count).toBe(1)
					done()
				})
			})
			.catch( err => {
				if (err) expect(true).toBe(false)
				done()
			})
		})
	})

	describe('get', () => {
		it(' show payed tenant', done => {
			persistence.isPayed(true).then( () => {
				schema.Tenant.count({}, (err, count) => {
					if (err) expect(true).toBe(false)
					expect(count).toBe(1)
					done()
				})
			})
			.catch( err => {
				if (err) expect(true).toBe(false)
				done()
			})
		})
	})

})

