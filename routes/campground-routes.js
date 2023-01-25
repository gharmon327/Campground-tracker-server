// require Express
const express = require('express')
const { handle404 } = require('../lib/custom-errors')

// require the Model we just created
const Campground = require('../models/campground')
const { requireToken } = require('../config/auth')

// Creating a router for us to make paths on
const router = express.Router()


// INDEX
// GET /campgrounds
router.get('/campgrounds', (req, res, next) => {
	Campground.find()
		.then((campgrounds) => {
			return campgrounds.map((campground) => campground)
		})
		.then((campgrounds) => res.status(200).json({ campgrounds: campgrounds }))
		.catch(next)
})

// SHOW
// GET /campgrounds/id
router.get('/campgrounds/:id', (req, res, next) => {
	// req.params.id will be set based on the `:id` in the route
	Campground.findById(req.params.id)
		.then(handle404)
		.then((campground) => res.status(200).json({ campground: campground }))
		.catch(next)
})

// CREATE
// POST /campgrounds
router.post('/campgrounds', (req, res, next) => {
	Campground.create(req.body.campground)
		.then((campground) => {
			res.status(201).json({ campground: campground })
		})
		.catch(next)
})

// UPDATE
// PATCH /campgrounds/id
router.patch('/campgrounds/:id', (req, res, next) => {
	Campground.findById(req.params.id)
		.then(handle404)
		.then((campground) => {
			return campground.updateOne(req.body.campground)
		})
		.then(() => res.sendStatus(204))
		.catch(next)
})

// DESTROY
// DELETE /campgrounds/id
router.delete('/campgrounds/:id', (req, res, next) => {
	Campground.findById(req.params.id)
		.then(handle404)
		.then((campground) => {
			campground.deleteOne()
		})
		.then(() => res.sendStatus(204))
		.catch(next)
})

module.exports = router