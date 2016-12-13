'use strict'

const Manager = require('./Manager.js')
const restify = require('restify')
const server = restify.createServer()
const auth = require('./modules/authenticator')

server.use(restify.fullResponse())
server.use(restify.bodyParser())
server.use(restify.queryParser())
server.use(restify.authorizationParser())


const status = {
	ok: 200,
	added: 201,
	deleted: 204,
	badRequest: 400,
	unauthorised: 401
}
const defaultPort = 8080


server.get('/tenant', /*auth.isAuthenticated,*/ (req, res) => {
	Manager.showTenant((err, tenants) => {
		res.setHeader('content-type', 'application/json')
		res.setHeader('accepts', 'GET')
		res.setHeader('accept-language', 'en-GB')
		if (err) res.send(status.badRequest, {error: err.message})
		else res.send(status.ok, tenants)
		res.end()
	})
})

server.get('/tenants', /*auth.isAuthenticated,*/ (req, res) => {
	Manager.showTenants((err, tenants) => {
		res.setHeader('content-type', 'application/json')
		res.setHeader('accepts', 'GET')
		res.setHeader('accept-language', 'en-GB')
		if (err) res.send(status.badRequest, {error: err.message})
		else res.send(status.ok, tenants)
		res.end()
	})
})


server.post('/tenants', /*auth.isAuthenticated,*/ (req, res) => {
	Manager.addTenant(req, (err, data) => {
		res.setHeader('content-type', 'application/json')
		res.setHeader('accepts', 'GET, POST'),
		res.setHeader('accept-language', 'en-GB')
		res.setHeader('added', new Date())
		if (err) res.send(status.badRequest, {error: err.message})
		else res.send(status.added, {tenant: data})
		res.end()
	})
})


server.put('/tenants',/*auth.isAuthenticated,*/ (req, res) => {
	Manager.putTenant(req, (err, data) => {
		res.setHeader('content-type', 'application/json')
		res.setHeader('accepts', 'GET, POST', 'PUT')
		res.setHeader('accept-language', 'en-GB')
		res.setHeader('last-modified', new Date())
		if (err) res.send(status.badRequest, {error: err.message})
		else res.send(status.ok, {tenant: data})
		res.end()
	})
})

server.del('/tenants', /*auth.isAuthenticated,*/ (req, res) => {
	Manager.removeTenant(req, (err, data) => {
		res.setHeader('content-type', 'application/json')
		res.setHeader('accepts', 'DELETE')
		res.setHeader('accept-language', 'en-GB')
		if (err) res.send(status.badRequest, {error: err.message})
		else res.send(status.deleted, data)
		res.end()
	})
})

/********************************* routing for users ***********************/
server.post('/users', (req, res) => {
	Manager.addUser(req, (err, data) => {
		res.setHeader('content-type', 'application/json')
		res.setHeader('accepts', 'GET, POST')
		res.setHeader('accept-language', 'en-GB')
		res.setHeader('added', new Date())
		if (err) res.send(status.badRequest, {error: err.message})
		else res.send(status.added, {user: data})
		res.end()
	})
})

server.put('/users', (req, res) => {
	Manager.putUser(req, (err, data) => {
		res.setHeader('content-type', 'application/json')
		res.setHeader('accepts', 'PUT')
		res.setHeader('accept-language', 'en-GB')
		res.setHeader('last-modified', new Date())
		if (err) res.send(status.badRequest, {error: err.message})
		else res.send(status.ok, {user: data})
		res.end()
	})
})


//delets users
server.del('/users', /*auth.isAuthenticated,*/ (req, res) => {
	Manager.removeUser(req, (err, data) => {
		res.setHeader('content-type', 'application/json')
		res.setHeader('accepts', 'DELETE')
		res.setHeader('accept-language', 'en-GB')
		if (err) res.send(status.badRequest, {error: err.message})
		else res.send(status.ok, data)
		res.end()
	})
})

/************************* Tenant location Details****************************/
server.get('/payed', /*auth.isAuthenticated,*/ (req, res) => {
	Manager.payed((err, tenants) => {
		res.setHeader('content-type', 'application/json')
		res.setHeader('accepts', 'GET')
		res.setHeader('accept-language', 'en-GB')
		if (err) res.send(status.badRequest, {error: err.message})
		else res.send(status.ok, tenants)
		res.end()
	})
})

server.get('/notPayed', /*auth.isAuthenticated,*/ (req, res) => {
	Manager.notPayed((err, tenants) => {
		res.setHeader('content-type', 'application/json')
		res.setHeader('accepts', 'GET')
		res.setHeader('accept-language', 'en-GB')
		if (err) res.send(status.badRequest, {error: err.message})
		else res.send(status.ok, tenants)
		res.end()
	})
})

const port = process.env.PORT || defaultPort

server.listen(port, err => {
	if (err) console.error(err)
	else console.log('App is ready at : ' + port)
})
