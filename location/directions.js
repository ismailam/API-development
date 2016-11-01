

const request = require('request')


exports.getDistance = (origin, destination, callback) => {
	apiCall(origin, destination, (err, route) => {
		if (err) {
		    return callback(err)
		    
		}
		return callback(null, `${destination} is ${route.distance.text} from ${origin}`)
	})
}

function apiCall(origin, destination, callback) {
	const firstIndex = 0
	const url = `https://maps.googleapis.com/maps/api/directions/json?region=gb&origin=${origin}&destination=${destination}`
	console.log(url)
	request.get(url, (err, res, body) => {
	    
		if (err){
		    return callback(new Error('Google API error'))
		    
		}
		
		const json = JSON.parse(body)
		
		if (json.status !== 'OK') {
		    return callback(new Error('invalid location'))
		}
		
		const route = json.routes[firstIndex].legs[firstIndex]
		return callback(null, route)
	})
}