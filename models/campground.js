// require mongoose
const mongoose = require('mongoose')
const campsiteSchema = require('./campsite')

// Getting the Schema from Mongoose
const Schema = mongoose.Schema

// Creating a new campground Schema
const campgroundSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
        location: {
			type: String,
			required: true,
		},
        sites: {
			type: Number,
			required: false,
		},
        campsite: [campsiteSchema],
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
	},
	{
		timestamps: true,
	}
)

// Creating a Mongoose Model called Campground
// Collection will be called campgrounds
const Campground = mongoose.model('Campground', campgroundSchema)

// Exporting Campground model to use elsewhere
module.exports = Campground