'use strict';
const url = require('url');


const authenticator = require('./modules/authenticator');
const tenantManager = require('./tenantManager');
const persistence = require('./modules/persistence')
const config = require('./config');
const restify = require('restify')

const schema = require('./schema/schema')
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
	res.setHeader('content-type', 'application/json')
	res.setHeader('accepts', 'GET, POST')
	
	tenantManager.showTenants().then((data) => {
		res.send(status.ok, data)
	}).catch( err => {
		res.send(status.badRequest, {error: err.message})
	})
	res.end()
		
	

	
})





server.post('/lists', (req, res) => {
	res.setHeader('content-type', 'application/json')
	res.setHeader('accepts', 'GET, POST')
	
	
})


server.put('/lists/:tenant_id', (req, res) => {
	res.setHeader('content-type', 'application/json')
	res.setHeader('accepts', 'GET, POST', 'PUT')
	

	
})


server.del('/lists/:tenant_id', (req, res) => {
	res.setHeader('content-type', 'application/json')
	res.setHeader('accepts', 'GET, POST', 'PUT', 'DELETE')
	

});
	










const port = process.env.PORT || defaultPort

server.listen(port, err => {
	if (err) {
		console.error(err)
	} else {
		console.log('App is ready at : ' + port)
	}
})


