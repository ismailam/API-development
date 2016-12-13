'use strict'

const frisby = require('frisby')

const status = {
	'ok': 200,
	'created': 201,
	'notModified': 304,
	'badRequest': 400,
	'unauthorised': 401,
	'notFound': 404
}


/*  // globalSetup defines any settigs used for ALL requests */
// frisby.globalSetup({
// 	request: {
// 		headers: {'Authorization': 'Basic dGVzdHVzZXI6cDQ1NXcwcmQ=','Content-Type': 'application/json'}
// 	}
// })

frisby.create('Show correct tenant')
    .get('https://api-development-ab-kwais.c9users.io/t')
    .expectStatus(status.ok)
    .expectHeader('content-type', 'application/json')
    .expectJSON('?', {name: 'kundra'})
    .toss()


frisby.create('add a new tenant to system')
  .post('https://api-development-ab-kwais.c9users.io/tenants', { name: 'conor', age: 45, locations: 'New York'},
  {json: true})
  .expectHeaderContains('Content-Type', 'json')
  .expectStatus(status.created)
  .toss()

frisby.create('update existing tenant')
  .put('https://api-development-ab-kwais.c9users.io/tenants', {age: 45}, {json: true})
  .expectHeaderContains('Content-Type', 'json')
  .expectStatus(status.created)
  .toss()

 /******************************GET, POST, PUT USER **********************/

 /***************************  USER REGISTRATION ***********************/
frisby.create('Show correct user')
    .get('https://api-development-ab-kwais.c9users.io/users')
    .expectStatus(status.ok)
    .expectHeader('content-type', 'application/json')
    .expectJSON('?', { username: 'amir'})
.toss()


frisby.create('add a new user to system')
  .post('https://api-development-ab-kwais.c9users.io/users', {username: 'yumt',password: 7878}, {json: true})
  .expectHeaderContains('Content-Type', 'json')
  .expectStatus(status.created)
  .toss()

frisby.create('update existing password')
  .put('https://api-development-ab-kwais.c9users.io/users', {password: 5350}, {json: true})
  .expectHeaderContains('Content-Type', 'json')
  .expectStatus(status.created)
  .toss()
