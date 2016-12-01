
'use strict'

const schema = require('../schema/schema')

exports.addTenant = function(req, res) {
	
	res.setHeader('content-type', 'application/json')
	res.setHeader('accepts', 'GET, POST')
	
  // Create a new instance of the Tenant model
  const tenant = new schema.Tenant();

  tenant.name = req.body.name;
  tenant.Email = req.body.email;
  tenant.locations = req.body.locations;
  tenant.phoneNumber = req.body.phoneNumber;

  
  tenant.save(function(err) {
    if (err){
    	res.send(err);
    	
    }
    res.json({ message: 'Tenant added to the system!', data: tenant});
  });
};


// exports.getTenants = function(req, res) {
// 	res.setHeader('content-type', 'application/json')
// 	res.setHeader('accepts', 'GET, POST')
	
// 	schema.Tenant.find((err, tenants) =>{
// 		if (err){
// 			res.send(err);
			
// 		}
// 		res.json(tenants);
		
// 	});
// };

// exports.getTenant = function(req, res) {
// 	// Use the Tenant model to find a specific tenant
// 	schema.Tenant.findById(req.params.tenant_id, (err, beer) =>{
// 		if (err){
// 			res.send(err);
			
// 		}
// 		res.json(beer);
//   });
// };

// exports.updateTenant = function(req, res) {
// 	schema.Tenant.findById(req.params.tenant_id, function(err, beer) {
// 		if (err){
// 			res.send(err);
// 		}
// 		const tenant = new schema.Tenant()
		
// 		tenant.update( (err, tenant) =>  {
// 			if (err){
// 				res.send(err)
				
// 			}
// 			res.json(tenant);
			
// 		});
//   });
// };

// exports.deleteTenant = function(req, res) {
	
// 	schema.TenantfindByIdAndRemove(req.params.tenant_id, function(err) {
// 		if (err){
// 			res.send(err);
// 		}
// 		res.json({ message: 'Tenant removed from the system!' });
//   });
// };

// // Create endpoint /api/users for POST
// exports.postUsers = function(req, res) {
// 	const user = new schema.User({
// 		username: req.body.username,
// 		password: req.body.password
		
// 	});
	
// 	user.save(function(err) {
// 		if (err){
// 			res.send(err);
// 		}
// 		res.json({ message: 'Account added to system!' });
//   });
// };

// // Create endpoint /api/users for GET
// exports.getUsers = function(req, res) {
// 	schema.User.find(function(err, users) {
// 		if (err){
// 			res.send(err);
			
// 		}
// 		res.json(users);
		
// 	});
// };

