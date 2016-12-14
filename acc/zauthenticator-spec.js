'use strict'


/*istanbul ignore next*/
/* global expect */
/* global describe*/

const auth = require('../modules/authenticator')

describe('pass', () => {
	it('correct authentication', done => {
	    
	    
	    auth.isAuthenticated('kwais', 'nubuk').then((err, data) => {
	        if(err) expect(true).toBe(false)
	        
	        done()
	    })
	    
	    .catch( err => {
			if (err) expect(true).toEqual(false)
			done()

		})
	    
	})
    
})