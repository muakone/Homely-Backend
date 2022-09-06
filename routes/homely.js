const express = require('express')
const {
  createFood,
  getFoods,
  getFood,
  deleteFood,
  updateFood
} = require('../controllers/homelyController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()


// GET all workouts
router.get('/', getFoods)

//GET a single workout
router.get('/:id', getFood)

// POST a new workout
router.post('/', createFood)

// DELETE a workout
router.delete('/:id', deleteFood)

// UPDATE a workout
router.patch('/:id', updateFood)


module.exports = router