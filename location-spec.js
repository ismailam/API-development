'use strict'
/*istanbul ignore next*/
/* global expect */
/* global describe*/
const location = require('../modules/location');

describe('get', () => {
		it(' show tenant location', done => {
			location.getLocation('CV1 5FB').then( (err) => {
			    if (err) expect(true).toBe(false)
			    done()
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

