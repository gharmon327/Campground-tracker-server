// require mongoose
const mongoose = require('mongoose')

// Getting the Schema from Mongoose
const Schema = mongoose.Schema

// Creating a new campsite Schema
const campsiteSchema = new Schema(
	{
        siteNumber: {
            type: Number,
            required: true
        },
		isOccupied: {
			type: Boolean,
			required: true,
		},
	},
	{
		timestamps: true,
	}
)

// Creating a Mongoose Model called Campsite
// Collection will be called campsites
const Campsite = mongoose.model('Campsite', campsiteSchema)

// Exporting Campsite model to use elsewhere
module.exports = Campsite
