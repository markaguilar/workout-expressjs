require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const workoutRouters = require('./routes/workouts')
// const cors = require("cors");

//express app
const app = express()

// middleware
app.use(express.json())

app.use((req,res ,next ) => {
    console.log(req.path, req.method)
    // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
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

