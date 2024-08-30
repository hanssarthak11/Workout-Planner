const Workout = require('../Model/WorkoutModel')
const mongoose = require('mongoose')

//GET all workouts 
const getWorkouts = async (req, res) => {
    const workouts = await Workout.find({}).sort({ createdAt: -1 })
    res.status(200).json(workouts)
}

//GET a single workout
const getWorkout = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such Workout' })
    }
    const workout = await Workout.findById(id)
    if (!workout) {
        return res.status(404).json({ error: 'No such Workout' })
    }
    res.status(200).json(workout)
}

//create a new workout 
const createworkout = async (req, res) => {
    const { title, load, reps } = req.body

let emptyFields = [] 

if(!title){
    emptyFields.push('title')
}
if(!load){
    emptyFields.push('load')
}
if(!reps){
    emptyFields.push('reps')
}
if(emptyFields.length > 0 ){
    return res.status(400).json({error: 'Please fill in all the fields' , emptyFields})
}

    //Adding doc to db
    try {
        const workout = await Workout.create({ title, load, reps })
        res.status(200).json(workout)
    } catch (error) {
        res.status(400).json({error: error.message })
    }
}

//DELETE a workout
const deleteWorkout = async (req, res) => {
    let { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such Workout' })
    }
    const workout = await Workout.findByIdAndDelete({ _id: id })
    if (!workout) {
        return res.status(404).json({ error: 'No such Workout' })
    }
    res.status(200).json(workout)
}

//UPDATE a single workout 
const updateWorkout = async (req, res) => {
    let { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such Workout' })
    }
    const workout = await Workout.findOneAndUpdate({ _id: id }, {
        ...req.body
    })
    if (!workout) {
        return res.status(404).json({ error: 'No such Workout' })
    }
    res.status(200).json(workout)
}



module.exports = {
    getWorkouts,
    getWorkout,
    createworkout,
    deleteWorkout,
    updateWorkout
}