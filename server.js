require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const workoutRouters = require('./routes/workouts')
const cors = require("cors");

//express app
const app = express()

// middleware
app.use(express.json(), cors())

app.use((req,res ,next ) => {
    console.log(req.path, req.method)
    next()
})

app.use('/api/workouts', workoutRouters)

// connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // listen for request
        app.listen(process.env.PORT, () => {
            console.log('connected to db & listening on http://localhost:' + process.env.PORT)
        })

    })
    .catch((err) => {
        console.log(err)
    })

