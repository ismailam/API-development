'use strict'
/*istanbul ignore next*/
/* global expect */
/* global describe*/

const userPersistence = require('../modules/user')
const userschema = require('../schema/userSchema')

describe('user collection', () => {
	beforeEach( done => {
		userschema.User.remove({}, err => {
			if (err) expect(true).toBe(false)
			const userI = {username: 'kundra', password: 'huynb'}

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

	describe('remove', () => {
		it('- existing user', done => {
			userPersistence.deleteUser('kundra').then( () => {
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
			const userI = {username: 'jafru', password: 'coventry'}

			userPersistence.postUser(userI).then( () => {
				userschema.User.count({}, (err, count) => {
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
		it(' modify password', done => {
			userPersistence.updatePassword('kundra', 'yhu').then( () => {
				userschema.User.count({}, (err, count) => {
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
