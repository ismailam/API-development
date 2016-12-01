'use strict';
const url = require('url');

const persistence = require('./modules/persistence')
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


//server.get('/',  persistence.getTenants)


server.post('/tenants', persistence.addTenant);


const port = process.env.PORT || defaultPort

server.listen(port, err => {
	if (err) {
		console.error(err)
	} else {
		console.log('App is ready at : ' + port)
	}
})

