require('dotenv').config()

const express = require('express')
const WorkoutRoutes = require('./Routes/workouts')
const mongoose = require('mongoose')
// const {connectToDb , getDb} = require('./db')

const app = express()

app.use(express.json())
app.use('/api/workouts', WorkoutRoutes)
app.get('/', (req, res) => {
    res.json({ mssg: 'Welcome to port' })
})  


// const http = require('http') 

// const server = http.createServer() 
// server.listen(6000)

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log("Connected to db and Listening on port", process.env.PORT, "!!!")
        })
    })
    .catch((error) => {
        console.log(error)
    })


//DB connection 
// let db 

// connectToDb((err)=>{
//     if(!err){
//         app.listen(process.env.PORT , ()=>{
//             console.log("Connected to db and listening on port" , process.env.PORT)
//         })
//         db = getDb()
//     }

// })

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})
