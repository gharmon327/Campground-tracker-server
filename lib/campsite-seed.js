const express = require('express')

const Campsite = require('../models/campsite')

const router = express.Router()

const startCampsites = [
	{
        siteNumber: 1,
		isOccupied:  false
	},
    {
        siteNumber: 2,
		isOccupied:  false
	},
    {
        siteNumber: 3,
		isOccupied:  false
	},
    {
        siteNumber: 4,
		isOccupied:  false
	},
    {
        siteNumber: 5,
		isOccupied:  false
	}
]

router.get('/campsites', (req, res, next) => {
	Campsite.deleteMany({})
        .then(() => {
            Campsite.create(startCampsites)
                .then((campsites) => res.status(200).json({ campsites: campsites }))
        })
        .catch(next)
})

module.exports = router