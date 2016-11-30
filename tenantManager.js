'use strict'

const persistence = require('./modules/persistence')

// function authorize(req) {
    
//     return new Promise ((resolve,reject)=>{
//       auth.getHeaderCredentials(req).then(credentials => {
//       this.password = credentials.password
//       return persistence.getCredentials(credentials)
//       })
//     })
    
// }



// functions 
exports.showTenants = new Promise( (resolve, reject) => {
    persistence.getTenants().then((data) => {
		resolve(data)
	}).catch( err => {
		reject(err)
	})
    
	    
})














