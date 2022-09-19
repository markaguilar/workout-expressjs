require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const workoutRouters = require('./routes/workouts')

//express app
const app = express()

// middleware
app.use(express.json())

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

