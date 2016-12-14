'use strict'

const request = require('request')

//shows tenants locations
exports.getLocation = location => new Promise( (resolve, reject) => {
	const url = `https://maps.googleapis.com/maps/api/geocode/json?region=gb&units=metric&appid=44c39f3fa462f86b3fc88f5678e5c5ff&address=${location}`

	request.get( url, (err, res, body) => {
		if (err) reject(Error('invalid location: could not find'))
		const json = JSON.parse(body)

		if (json.status === 'ZERO_RESULTS') reject(Error('no results found'))

		const locationDetails= {
			House_Number: json.results[0].address_components[0].long_name,
			Street_Name: json.results[0].address_components[1].long_name,
			City: json.results[0].address_components[2].long_name,
			County: json.results[0].address_components[3].long_name,
			Country: json.results[0].address_components[4].long_name,
			Post_Code: json.results[0].address_components[6].long_name,
			Location: {lat: json.results[0].geometry.location.lat.toFixed(6), long: json.results[0].geometry.location.lng.toFixed(6)
			}
		}

		resolve(locationDetails)
	})
})

//shows tenants distance from tenancy agency
exports.distanceFromAgency = (agencyLocation, tenantsLocation) => new Promise( (resolve, reject) => {

	const url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${agencyLocation}&destinations=${tenantsLocation}&key=AIzaSyDhxZcgm_f3Tdc93_LHhl2KA9MUj1Eh_jc`

	request.get( url, (err, res, body) => {

		if (err) reject(Error('failed to make API call'))

		const json = JSON.parse(body)

		if (json.status === 'ZERO_RESULTS') reject(Error('no results found'))

		const distanceDetails= {
			Distance: json.rows[0].elements[0].distance.text,
			Duration: json.rows[0].elements[0].duration.text
		}

		resolve(distanceDetails)
	})
})


// const sync = require('sync-request')

// const home

// exports.setHome = (location, callback) => {
// 	const loc = getLocation(location)
// 	home = getLocation(location)
// 	const latLng = home.split(',')
// 	callback({lat:parseFloat(latLng[0]), lng:parseFloat(latLng[1])})
	
//}
// function getLocation(address) {
// 	return new Promise((resolve, reject) => {
// 		const url = `https://maps.googleapis.com/maps/api/geocode/json?region=gb&units=metric&appid=44c39f3fa462f86b3fc88f5678e5c5ff&address=${address}`
// 		request.get( url, (err, res, body) => {

// 		if (err) reject(Error('failed to make API call'))
// 		const json = JSON.parse(body)

// 		if (json.status === 'ZERO_RESULTS') reject(Error('no results found'))
		
// 		const loc = json.results[0].geometry.location
// 		dataL = loc.lat.toFixed(6)+','+loc.lng.toFixed(6)

// 		resolve(dataL)
// 	})
		
// 	})
	
// }


// function apiCall(origin, destination) {
// 	return new Promise((resolve, reject) => {
// 		const url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${origin}&destinations=${destination}&key=AIzaSyDhxZcgm_f3Tdc93_LHhl2KA9MUj1Eh_jc`
// 		request.get( url, (err, res, body) => {

// 		if (err) reject(Error('failed to make API call'))

// 		const json = JSON.parse(body)

// 		if (json.status === 'ZERO_RESULTS') reject(Error('no results found'))


// 		resolve(json)
			
// 		})
		
// 	})
	
// }

// const getRouteData = function(start, end) {
// 	return new Promise((resolve, reject) => {
// 		const url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${start}&destinations=${end}&key=AIzaSyDhxZcgm_f3Tdc93_LHhl2KA9MUj1Eh_jc`
// 		request.get( url, (err, res, body) => {
// 			if (err) reject(Error('failed to make API call'))
			
// 			const json = JSON.parse(body)
			
// 			if (json.status === 'ZERO_RESULTS') reject(Error('no results found'))
			
// 			resolve(json)
// 		})
		
// 	})
// }

