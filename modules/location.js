'use strict'

const request = require('request');

//shows tenants locations
exports.getLocation = location => new Promise( (resolve, reject) =>{
	
	const url = `https://maps.googleapis.com/maps/api/geocode/json?region=gb&units=metric&appid=44c39f3fa462f86b3fc88f5678e5c5ff&address=${location}`;
	//console.log(url);
	
	request.get( url, (err, res, body) => {
		
		if (err) reject(Error('invalid location: could not find'));
		
		const json = JSON.parse(body);
		//console.log(JSON.stringify(json, null, 2));
		
		console.log(json.results[0].geometry.location)
		
		if (json.status === 'ZERO_RESULTS') {
			reject(Error('no results found'));
			
		}
			
		const locationDetails= {
			House_Number: json.results[0].address_components[0].long_name,
			Street_Name: json.results[0].address_components[1].long_name,
			City: json.results[0].address_components[2].long_name,
			County: json.results[0].address_components[3].long_name,
			Country: json.results[0].address_components[4].long_name,
			Post_Code: json.results[0].address_components[6].long_name,
			Location: json.results[0].geometry.location
		}

		resolve(locationDetails);
		
	});
	
	
	
})

//shows tenants distance from tenancy agency
exports.distanceFromAgency = (agencyLocation, tenantsLocation) => new Promise( (resolve, reject) =>{
	
	const url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${agencyLocation}&destinations=${tenantsLocation}&key=AIzaSyDhxZcgm_f3Tdc93_LHhl2KA9MUj1Eh_jc`;
	console.log(url);
	
	request.get( url, (err, res, body) => {
		
		if (err) {
			reject(Error('failed to make API call'));
		}
		const json = JSON.parse(body);
		
		if (json.status === 'ZERO_RESULTS') {
			reject(Error('no results found'));
			
		}
		
		
		const distanceDetails= {
			Tenant_Address: json.destination_addresses[0],
			Agency_Address: json.origin_addresses[0],
			Distance: json.rows[0].elements[0].distance.text,
			Duration: json.rows[0].elements[0].duration.text
		}

		
	
		resolve(distanceDetails);
		
	});
	
	
	
})

//direction to tenants from agency
exports.directionFromAgency = (agencyLocation, tenantsLocation) => new Promise( (resolve, reject) =>{
	
	const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${agencyLocation}&destination=${tenantsLocation}`;
	//console.log(url);
	
	request.get( url, (err, res, body) => {
		
	
		if (err) {
			reject(Error('failed to make API call'));
		}
		
		const json = JSON.parse(body);
		
		
		if (json.status === 'ZERO_RESULTS') {
			reject(Error('no results found'));
			
		}
		
		//console.log(JSON.stringify(json, null, 2));
		
		
		console.log(json.destination_addresses[0])
		
		
		resolve(json);
		
	});
	
	
	
})




