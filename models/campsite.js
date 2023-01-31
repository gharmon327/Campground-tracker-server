// require mongoose
const mongoose = require('mongoose')


// Creating a new campsite Schema
const campsiteSchema = new mongoose.Schema(
	{
        siteNumber: {
            type: Number,
            required: true
        },
		isOccupied: {
			type: Boolean,
			required: true
		},
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
	},
	{
		timestamps: true,
	}
)


// Exporting Campsite model to use elsewhere
module.exports = campsiteSchema
