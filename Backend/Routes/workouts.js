const express = require('express')
const {
    getWorkouts,
    getWorkout,
    createworkout,
    deleteWorkout,
    updateWorkout
} = require('../controllers/workoutcontrollers')

const router = express.Router()

//GET all workouts 
router.get('/', getWorkouts)

//GET  a single workout
router.get('/:id', getWorkout)

//POST workout
router.post('/', createworkout)

//DELETE a workout
router.delete('/:id', deleteWorkout)

//UPDATE a workout
router.patch('/:id', updateWorkout)


module.exports = router 