'use strict'

// import the mongoose package
const mongoose = require('mongoose')


const db = {
	user: 'ismailam',
	pass: '38055322abba'
}
//mongodb://<dbuser>:<dbpassword>@ds161487.mlab.com:61487/tenantdb
mongoose.connect('mongodb://ismailam:38055322abba@ds161487.mlab.com:61487/tenantdb'
);



mongoose.Promise = global.Promise
const Schema = mongoose.Schema

// create a schema
const tenantSchema = new Schema({
	tenantId: String,
	userId: String,
	name: String,
	age: Number,
	Email: String,
	location: Object,
	distance: String,
	isPayed: Boolean,
	added: Date,
	phoneNumber: Number,
	roomNumber: Number,
	rentAmount: Number,
	startDate: Date,
	endDate: Date
})

// create a model using the schema
exports.Tenant = mongoose.model('Tenant', tenantSchema)





