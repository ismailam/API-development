
'use strict'
/*istanbul ignore next*/
/* global expect */
/* global describe*/

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
})