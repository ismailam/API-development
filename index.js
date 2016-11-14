'use strict';

const request = require('request');


const url = `https://maps.googleapis.com/maps/api/directions/json?region=gb&origin=CV15JQ&destination=CV15FB`;

request.get(url, (err, res, body) => {
    
   console.log(err);
   
   const json = JSON.parse(body);
   console.log(json);
   
   console.log(res.headers);
   
    
    
	})




