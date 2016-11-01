'use strict'

const readline = require('readline-sync')
const directions = require('./directions')

const origin = String(readline.question('first person: ')).trim()
const destination = String(readline.question('second person: ')).trim()

directions.getDistance(origin, destination, (err, distance) => {
	try {
		if (err) {
			throw err
		}
		
		console.log(distance)
	} catch(err) {
		console.log(`ERROR: ${err.message}`)
	}
})

console.log('EOF')