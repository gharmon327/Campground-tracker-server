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
router.post('/campgrounds', requireToken, (req, res, next) => {
    const campground = req.body.campground
    campground.owner = req.user._id
    // console.log(campground.owner)
	Campground.create(req.body.campground)
		.then((campground) => {
			res.status(201).json({ campground: campground })
		})
		.catch(next)
})

// UPDATE
// PATCH /campgrounds/id
router.patch('/campgrounds/:id', requireToken, (req, res, next) => {
    const campground = req.body.campground

	Campground.findById(req.params.id)
		.then(handle404)
		.then((campground) => {
			console.log(req.user)
			console.log(campground.owner)
			console.log(req.user._id)
			// if (campground.owner == req.user._id){console.log('true')}else{console.log('false')}
			console.log(campground.owner.equals(req.user._id))
			if (campground.owner.equals(req.user._id)) {
				return campground.updateOne(req.body.campground)
			}else{const err = new Error('Must be campground owner to Delete')
			err.statusCode = 401
			res.sendStatus(422)
			throw err}
		})
		.then(() => res.sendStatus(204))
		.catch(next)		
})

// DESTROY
// DELETE /campgrounds/id
router.delete('/campgrounds/:id', requireToken, (req, res, next) => {
	Campground.findById(req.params.id)
		.then(handle404)
		.then((campground) => {
			if (campground.owner.equals(req.user._id)) {
				return campground.deleteOne()
			}else{const err = new Error('Must be campground owner to Delete')
			err.statusCode = 422
			throw err}
		})
		.then(() => res.sendStatus(204))
		.catch(next)
})

module.exports = router