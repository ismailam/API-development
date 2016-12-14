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

frisby.create('add a new tenant to system')
  .post('https://api-development-ab-kwais.c9users.io/tenants', { name: 'conor', age: 45, locations: 'New York'},
  {json: true})
  .expectHeaderContains('Content-Type', 'json')
  .expectStatus(status.created)
  .toss()

frisby.create('Show correct tenant')
    .get('https://api-development-ab-kwais.c9users.io/tenant')
    .expectStatus(status.ok)
    .expectHeader('content-type', 'application/json')
    .expectJSON('?', {name: 'conor'})
    .toss()


frisby.create('Show correct tenants')
    .get('https://api-development-ab-kwais.c9users.io/tenants')
    .expectStatus(status.ok)
    .expectHeader('content-type', 'application/json')
    .expectJSON('?', {name: 'conor', age: 45})
    .toss()

frisby.create('update existing tenant')
  .put('https://api-development-ab-kwais.c9users.io/tenants', {age: 45}, {json: true})
  .expectHeaderContains('Content-Type', 'json')
  .expectStatus(status.ok)
  .toss()

 /******************************GET, POST, PUT USER **********************/

 /***************************  USER REGISTRATION ***********************/

frisby.create('add a new user to system')
  .post('https://api-development-ab-kwais.c9users.io/users', {username: 'yumt',password: 7878}, {json: true})
  .expectHeaderContains('Content-Type', 'json')
  .expectStatus(status.created)
  .toss()

frisby.create('update existing password')
  .put('https://api-development-ab-kwais.c9users.io/users', {password: 5350}, {json: true})
  .expectHeaderContains('Content-Type', 'json')
  .expectStatus(status.ok)
  .toss()


frisby.create('show payed tenant')
  .put('https://api-development-ab-kwais.c9users.io/tenants/payed', {json: true})
  .expectHeaderContains('Content-Type', 'json')
  .expectStatus(status.ok)
  .toss()

frisby.create('show not payed tenant')
  .put('https://api-development-ab-kwais.c9users.io/tenants', {json: true})
  .expectHeaderContains('Content-Type', 'json')
  .expectStatus(status.ok)
  .toss()
