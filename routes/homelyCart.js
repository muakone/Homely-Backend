const express = require('express')
const {
  addCart,
  getCarts,
  getCart,
  deleteCart,
  deleteUserCart,
  updateCart
} = require('../controllers/homelyCartController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// require auth for all workout routes
router.use(requireAuth)

// GET all workouts
router.get('/', getCarts)

//GET a single workout
router.get('/:id', getCart)

// POST a new workout
router.post('/', addCart)

// DELETE a workout
router.delete('/:id', deleteCart)

// DELETE a user_id
router.delete('/user/:user_id', deleteUserCart)

// UPDATE a workout
router.patch('/:id', updateCart)


module.exports = router