const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const db = require('./config/db')
const PORT = process.env.PORT || 8002

const campgroundRoutes = require('./routes/campground-routes')
const campsiteRoutes = require('./routes/campsite-routes')
const userRoutes = require('./routes/user-routes')
const campsiteSeed = require('./lib/campsite-seed')

mongoose.set('strictQuery', true)
mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const app = express()
app.use(cors({ origin: process.env.CLIENT_ORIGIN || `http://127.0.0.1:5504` }))

app.use(express.json())
app.use(campgroundRoutes)
app.use(campsiteRoutes)
app.use(userRoutes)
app.use('/seed', campsiteSeed)

app.listen(PORT, () =>{
    console.log('listening on ' + PORT)
})

module.exports = app