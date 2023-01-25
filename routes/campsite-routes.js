// require Express
const express = require('express')
const { handle404 } = require('../lib/custom-errors')

// require the Model we just created
const Campsite = require('../models/campsite')
const { requireToken } = require('../config/auth')

// Creating a router for us to make paths on
const router = express.Router()

// INDEX
// GET /campsites
router.get('/campsites', (req, res, next) => {
	Campsite.find()
		.then((campsites) => {
			return campsites.map((campsite) => campsite)
		})
		.then((campsites) => res.status(200).json({ campsites: campsites }))
		.catch(next)
})

// SHOW
// GET /campsites/id
router.get('/campsites/:id', (req, res, next) => {
	// req.params.id will be set based on the `:id` in the route
	Campsite.findById(req.params.id)
		.then(handle404)
		.then((campsite) => res.status(200).json({ campsite: campsite }))
		.catch(next)
})

// CREATE
// POST /campsites
router.post('/campsites', (req, res, next) => {

	Campsite.create(req.body.campsite)
		.then((campsite) => {
			res.status(201).json({ campsite: campsite })
		})
		.catch(next)
})

// UPDATE
// PATCH /campsites/id
router.patch('/campsites/:id', (req, res, next) => {
	Campsite.findById(req.params.id)
		.then(handle404)
		.then((campsite) => {
			return campsite.updateOne(req.body.campsite)
		})
		.then(() => res.sendStatus(204))
		.catch(next)
})

// DESTROY
// DELETE /campgrounds/id
router.delete('/campsites/:id', (req, res, next) => {
	Campsite.findById(req.params.id)
		.then(handle404)
		.then((campsite) => {
			campsite.deleteOne()
		})
		.then(() => res.sendStatus(204))
		.catch(next)
})

module.exports = router