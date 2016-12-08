
'use strict'
/*istanbul ignore next*/
/* global expect */
/* global describe*/
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
	
	describe('get', () => {
		it(' show tenant', done => {
			persistence.getTenant('kundra').then( () => {
				schema.Tenant.count({}, (err, count) => {
					if (err) expect(true).toBe(false)
					expect(count).toBe(1)
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
	
	describe('update', () => {
		it(' modify tenant', done => {
			const age =  16;
			persistence.updateTenant('kundra', age).then( () => {
				schema.Tenant.count({}, (err, count) => {
					if (err) expect(true).toBe(false)
					expect(count).toBe(1)
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

const userPersistence = require('../modules/user');
const userschema = require('../schema/userSchema');

describe('user registration', () => {
	beforeEach( done => {
		userschema.User.remove({}, err => {
			if (err) expect(true).toBe(false)
			const userI = {
				username: 'amir', 
				password: 4890
				
				
			}
			new userschema.User(userI).save( (err, user) => {
				if (err) expect(true).toBe(false)
					userschema.User.count({}, (err, count) => {
					if (err) expect(true).toBe(false)
					expect(count).toBe(1)
					done()
				})
			})
		
		})
	})
	
	describe('get', () => {
		it(' show user', done => {
			userPersistence.getUsers('amir').then( () => {
				userschema.User.count({}, (err, count) => {
					if (err) expect(true).toBe(false)
					expect(count).toBe(1)
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
		it('+ new user', done => {
			const userI = {
				username: 'jibrin', 
				password: 68950,
	 			
				
			}
			userPersistence.postUser(userI).then( () => {
				userschema.User.count({}, (err, count) => {
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
	
	describe('update', () => {
		it(' modify user password', done => {
			const password =  1906;
			userPersistence.updatePassword('amir', password).then( () => {
				userschema.User.count({}, (err, count) => {
					if (err) expect(true).toBe(false)
					expect(count).toBe(1)
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
	
	
	describe('remove', () => {
		it('- existing user', done => {
			userPersistence.deleteUser('amir').then( () => {
				userschema.User.count({}, (err, count) => {
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
	
	

})
