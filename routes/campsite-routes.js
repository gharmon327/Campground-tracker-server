// require Express
const express = require('express')
const { handle404 } = require('../lib/custom-errors')

// require the Model we just created
// const Campsite = require('../models/campsite')
const Campground = require('../models/campground')
const { requireToken } = require('../config/auth')

// Creating a router for us to make paths on
const router = express.Router()

// CREATE
// POST /campsites
router.post('/campsites', requireToken, (req, res, next) => {
    const campgroundId = req.body.campsite.campgroundId

    const campsite = req.body.campsite
    campsite.owner = req.user._id

    Campground.findById(campgroundId)
        .then(handle404)
        .then((campground) => {
            campground.campsite.push(req.body.campsite)

            return campground.save()
        })
        .then((campsite) => res.status(201).json({campsite : campsite}))
        .catch(next)
})

// UPDATE
router.patch('/campsites/:campsiteId', (req, res, next) => {
    const campgroundId = req.body.campsite.campgroundId

    Campground.findById(campgroundId)
        .then(handle404)
        .then((campground) => {
            const campsite = campground.campsite.id(req.params.campsiteId)
            campsite.set(req.body.campsite)
            return campground.save()
        })
        .then(() => res.sendStatus(204))
        .catch(next)
})

// INDEX
// GET /campsites
router.get('/campsites', (req, res, next) => {
	Campground.find()
		.then((campsites) => {
			return campsites.map((campsite) => campsite)
		})
		.then((campsites) => res.status(200).json({ campsites: campsites }))
		.catch(next)
})

// SHOW
// GET /campsites/id
router.get('/campsites/:id', (req, res, next) => {
	Campsite.findById(req.params.id)
		.then(handle404)
		.then((campsite) => res.status(200).json({ campsite: campsite }))
		.catch(next)
})






module.exports = router