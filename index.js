'use strict';

const tenantManager = require('./tenantManager.js');
const userManager = require('./userManager.js');
const restify = require('restify')
const server = restify.createServer()
const auth = require('./modules/authenticator');

server.use(restify.fullResponse())
server.use(restify.bodyParser())
server.use(restify.queryParser())
server.use(restify.authorizationParser())


const status = {
	ok: 200,
	added: 201,
	badRequest: 400,
	unauthorised: 401
}
const defaultPort = 8080;


server.get('/', /*auth.isAuthenticated,*/ (req, res) =>{
	tenantManager.showTenant((err, tenants) => {
		res.setHeader('content-type', 'application/json')
		res.setHeader('accepts', 'GET')
		
		if (err) {
			res.send(status.badRequest, {error: err.message})
		} else {
			
			res.send(status.ok, tenants)
		}
		res.end()
	})
	
	
	
})

server.get('/tenants', /*auth.isAuthenticated,*/  (req, res) =>{
	
	tenantManager.showTenants((err, tenants) => {
		res.setHeader('content-type', 'application/json')
		res.setHeader('accepts', 'GET')
		
		if (err) {
			res.send(status.badRequest, {error: err.message})
		} else {
			
			res.send(status.ok, tenants)
		}
		res.end()
	})
	
	
	
})



server.post('/tenants', /*auth.isAuthenticated,*/  (req, res) => {
	tenantManager.addTenant(req, (err, data) => {
		res.setHeader('content-type', 'application/json')
		res.setHeader('accepts', 'GET, POST')
		
		if (err) {
			res.send(status.badRequest, {error: err.message})
		} else {
			
			res.send(status.added, {tenant: data})
		}
		res.end()
	})
})


server.put('/tenants',/*auth.isAuthenticated,*/  (req, res) => {
	tenantManager.putTenant(req, (err, data) => {
		res.setHeader('content-type', 'application/json')
		res.setHeader('accepts', 'GET, POST', 'PUT')
		
		if (err) {
			res.send(status.badRequest, {error: err.message})
		} else {
			
			res.send(status.added, {tenant: data})
		}
		res.end()
	})
})

server.del('/tenants', /*auth.isAuthenticated,*/  (req, res) => {
	tenantManager.removeTenant(req, (err) => {
		res.setHeader('content-type', 'application/json')
		res.setHeader('accepts', 'DELETE')
		
		if (err) {
			res.send(status.badRequest, {error: err.message})
		} else {
			res.send(status.ok)
		}
		res.end()
	})
})







/********************************* 
 *								routing for users ***********************/
server.get('/users',  (req, res) =>{
	userManager.showUsers((err, users) => {
		res.setHeader('content-type', 'application/json')
		res.setHeader('accepts', 'GET')
		
		if (err) {
			res.send(status.badRequest, {error: err.message})
		} else {
			
			res.send(status.ok, users)
		}
		res.end()
	})
	
	
})




server.post('/users', (req, res) => {
	userManager.addUser(req, (err, data) => {
		res.setHeader('content-type', 'application/json')
		res.setHeader('accepts', 'GET, POST')
		
		if (err) {
			res.send(status.badRequest, {error: err.message})
		} else {
			
			res.send(status.added, {user: data})
		}
		res.end()
	})
})




server.put('/users', (req, res) => {
	userManager.putUser(req, (err, data) => {
		res.setHeader('content-type', 'application/json')
		res.setHeader('accepts', 'PUT')
		
		if (err) {
			res.send(status.badRequest, {error: err.message})
		} else {
			
			res.send(status.added, {user: data})
		}
		res.end()
	})
})




/************************* Tenant location 
 *											Details****************************/
 server.get('/location', /*auth.isAuthenticated,*/ (req, res) =>{
	tenantManager.tenantsLocation((err, locationDetails) => {
		res.setHeader('content-type', 'application/json')
		res.setHeader('accepts', 'GET')
		
		if (err) {
			res.send(status.badRequest, {error: err.message})
		} else {
			
			res.send(status.ok, locationDetails)
		}
		res.end()
	})
	
	
	
})

server.get('/distance', /*auth.isAuthenticated,*/ (req, res) =>{
	tenantManager.tenantsDistance((err, distanceDetails) => {
		res.setHeader('content-type', 'application/json')
		res.setHeader('accepts', 'GET')
		
		if (err) {
			res.send(status.badRequest, {error: err.message})
		} else {
			
			res.send(status.ok, distanceDetails)
		}
		res.end()
	})
	
	
	
})

 

const port = process.env.PORT || defaultPort

server.listen(port, err => {
	if (err) {
		console.error(err)
	} else {
		console.log('App is ready at : ' + port)
	}
})





