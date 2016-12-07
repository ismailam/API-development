'use strict'
/*istanbul ignore next*/
/* global expect */

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
				username: 'wasa', 
				password: 1689
				
			}
			userPersistence.postUser(userI).then( () => {
				userSchema.User.count({}, (err, count) => {
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
	
	describe('update', () => {
		it(' modify user password', done => {
			const password =  1906;
			userPersistence.updatePassword('amir', password).then( () => {
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
	
	
	// describe('remove', () => {
	// 	it('- existing tenant', done => {
	// 		persistence.deleteTenant('kundra').then( () => {
	// 			schema.Tenant.count({}, (err, count) => {
	// 				if (err) expect(true).toBe(false)
	// 				expect(count).toBe(1)
	// 				done()
	// 			})
				
	// 		})
	// 		.catch( err => {
	// 			if (err) expect(false).toBe(true)
	// 			done()
	// 		})
	// 	})
	// })
	
	

})
