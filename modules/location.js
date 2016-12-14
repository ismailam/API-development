'use strict'

const request = require('request')

/**
 * This module takes in the address of the tenant, gets the house number, postcode and adds it to the tenant!
 * @param {string} location - the address of the tenant.
 * @return {Promise<object|Error>} Location Details.
 */
exports.getLocation = location => new Promise( (resolve, reject) => {
	const url = `https://maps.googleapis.com/maps/api/geocode/json?region=gb&units=metric&appid=44c39f3fa462f86b3fc88f5678e5c5ff&address=${location}`

	request.get( url, (err, res, body) => {
		if (err) reject(Error('invalid location: could not find'))
		const json = JSON.parse(body)

		if (json.status === 'ZERO_RESULTS') reject(Error('no results found'))

		const locationDetails= {
			House_Number: json.results[0].address_components[0].long_name,
			Post_Code: json.results[0].address_components[6].long_name,
			Location: {lat: json.results[0].geometry.location.lat.toFixed(6), long: json.results[0].geometry.location.lng.toFixed(6)
			}
		}
		
		console.log(locationDetails)

		resolve(locationDetails)
	})
})


/**
 * This module gets the distance between the agency location and tenant location ands it to the tenant object!
 * @param {string} agencyLocation - The username already created.
 * @param {string} tenantsLocation - The new password to update.
 * @return {Promise<object|Error>} distance details.
 */
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


