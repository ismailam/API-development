'use strict';

const frisby = require('frisby');

const status = {
    'ok': 200,
    'created': 201,
    'notModified': 304,
	'badRequest': 400,
	'unauthorised': 401,
	'notFound': 404
    
}

/*  // globalSetup defines any settigs used for ALL requests */
frisby.globalSetup({
	request: {
		headers: {'Authorization': 'Basic AIzaSyA3NuZFTvEN9YJc_gl5-xmf7VRokVEPQvs=','Content-Type': 'application/json'}
	}
})

/* here is a simple automated API call making a GET request. We check the response code, one of the response headers and the content of the response body. After completing the test we call 'toss()' which moves the script to the next test. */
frisby.create('get direction')
	.get('https://maps.googleapis.com/maps/api/directions/json?origin=CV15JQ&destination=CV15FB')
	.expectStatus(status.badRequest)
	.expectHeaderContains('Content-Type', 'application/json')
	.expectJSON({message: 'no lists found'})
	.toss()