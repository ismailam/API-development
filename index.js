'use strict';

const tenantManager = require('./tenantManager.js');
const restify = require('restify')
const server = restify.createServer()


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


server.get('/',  (req, res) =>{
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

server.get('/tenants',  (req, res) =>{
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



server.post('/tenants', (req, res) => {
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




				//METHODS FOR USERS

server.get('/users',  (req, res) =>{
	tenantManager.showUser((err, users) => {
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
	tenantManager.addUser(req, (err, data) => {
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






const port = process.env.PORT || defaultPort

server.listen(port, err => {
	if (err) {
		console.error(err)
	} else {
		console.log('App is ready at : ' + port)
	}
})





