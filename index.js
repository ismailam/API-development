'use strict';

const restify = require('restify')
const server = restify.createServer()
const authenticator = require('./modules/authenticator');
const config = require('./config');
const url = require('url');
const CookieParser = require('restify-cookies');
const schema = require('./schema/schema')

server.use(restify.fullResponse())
server.use(restify.bodyParser())
server.use(restify.queryParser())
server.use(restify.authorizationParser())
server.use(CookieParser.parse);










const status = {
	ok: 200,
	added: 201,
	badRequest: 400
}
const defaultPort = 8080;


server.get('/', (req, res, next) =>{
	schema.Tenant.find( (err, tenants) => {
		res.setHeader('content-type', 'application/json');
 		res.setHeader('accepts', 'GET, POST');
		
		if (err){
			res.send(status.badRequest, {error: err.message})
		}
		res.send(status.ok, tenants);
		res.end()
  })
	
})




server.post('/lists', (req, res) => {
	res.setHeader('content-type', 'application/json')
	res.setHeader('accepts', 'GET, POST')
	
	const tenant = new schema.Tenant()

	// Set the tenant properties that came from the POST data
	tenant.name = req.body.name;
	tenant.age= req.body.age;
	
	
	// Save the tenantData and check for errors
	tenant.save( (err) => {
		if (err){
			res.send(err);
			
		}
		res.json({ message: 'Tenant successfully created!', data: tenant });
	  });
		

	
})


server.put('/lists/:tenant_id', (req, res) => {
	res.setHeader('content-type', 'application/json')
	res.setHeader('accepts', 'GET, POST', 'PUT')
	

	schema.Tenant.findById(req.params.tenant_id, (err, tenant) =>{
		if (err){
			res.send(err);
			
		}
		// Update the existing tenant age
		
		tenant.age = req.body.age;
		
		// Save the tenantData and check for errors
		
		tenant.save( (err) => {
			if (err){
				res.send(err);
				
			}
			res.json({ message: 'Tenant data updated!', data: tenant });
			
		});

	})
	
	
	
	
})


server.del('/lists/:tenant_id', (req, res) => {
	res.setHeader('content-type', 'application/json')
	res.setHeader('accepts', 'GET, POST', 'PUT', 'DELETE')
	
	schema.Tenant.findByIdAndRemove(req.params.tenant_id, (err) => {
    if (err){
    	res.send(err);
    }
    
    res.json({ message: 'Tenant removed from the system!' });
  });
});
	
	

server.get('/auth/twitter', authenticator.redirectToTwitterLoginPage);


server.get(url.parse(config.oauth_callback).path, (req, res) =>{
   authenticator.authenthicate(req, res, (err) =>{
      if (err){
         console.log(err);
         res.sendStatus(401);
      }
      else{
         res.send("Authentication Successful")
      }
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


