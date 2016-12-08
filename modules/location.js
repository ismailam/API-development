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
		
		console.log(json.long_name[0])
		
		if (json.status === 'ZERO_RESULTS') {
			reject(Error('no results found'));
			
		}
		
		resolve(json);
		
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
		console.log(JSON.stringify(json, null, 2));
		
		resolve(json);
		
	});
	
	
	
})

//direction to tenants from agency
exports.directionFromAgency = (agencyLocation, tenantsLocation) => new Promise( (resolve, reject) =>{
	
	const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${agencyLocation}&destination=${tenantsLocation}`;
	console.log(url);
	
	request.get( url, (err, res, body) => {
		
	
		if (err) {
			reject(Error('failed to make API call'));
		}
		
		const json = JSON.parse(body);
		
		
		if (json.status === 'ZERO_RESULTS') {
			reject(Error('no results found'));
			
		}
		
		console.log(JSON.stringify(json, null, 2));
		
		
		
		
		
		resolve(json);
		
	});
	
	
	
})




