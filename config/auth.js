// Require the needed npm packages
const passport = require('passport')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// Create a secret to be used to encrypt/decrypt the token
const secret = process.env.JWT_SECRET || 'some string value only your app knows'

// Require the specific `strategy` we'll use to authenticate
// Require the method that will handle extracting the token
const { Strategy, ExtractJwt } = require('passport-jwt')

// Minimum required options for passport-jwt
const opts = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: secret,
}

// Require the user model
const User = require('../models/user')

// We're configuring the strategy using the constructor from passport
const strategy = new Strategy(opts, function (jwt_payload, done) {
	User.findById(jwt_payload.id)
		.then((user) => done(null, user))
		.catch((err) => done(err))
})

// Now that we've constructed the strategy, we 'register' it
passport.use(strategy)

// Initialize the passport middleware based on the above configuration
passport.initialize()

// Create a variable that holds the authenticate method so we can
// export it for use in our routes
const requireToken = passport.authenticate('jwt', { session: false })

// Create a function that takes the request and a user document
// and uses them to create a token to send back to the user
const createUserToken = (req, user) => {
    // console.log(req.body)
	if (
		!user ||
		!req.body.credentials.password ||
		!bcrypt.compareSync(req.body.credentials.password, user.password)
	) {
		const err = new Error('The provided username or password is incorrect')
		err.statusCode = 422
		throw err
	}
	// If no error was thrown, we create the token from user's id and
	// return the token
	return jwt.sign({ id: user._id }, secret, { expiresIn: 36000 })
}

module.exports = {
	requireToken,
	createUserToken,
}