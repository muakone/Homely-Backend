const Homely = require('../models/homelyModel')
const mongoose = require('mongoose')

// get all dishes
const getFoods = async (req, res) => {
  //const user_id = req.user._id

  const food = await Homely.find({}).sort({createdAt: -1})

  res.status(200).json(food)
}

// get a single dish
const getFood = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such food'})
  }

  const food = await Homely.findById(id)

  if (!food) {
    return res.status(404).json({error: 'No such food'})
  }
  
  res.status(200).json(food)
}



// create new dish
const createFood = async (req, res) => {
  const {name, price, img, qty, category} = req.body

  let emptyFields = []

  if(!name) {
    emptyFields.push('name')
  }
  if(!price) {
    emptyFields.push('price')
  }
  if(emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
  }

  // add doc to db
  try {
    //const user_id = req.user._id
    const food = await Homely.create({name, price, img, qty, category})
    res.status(200).json(food)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// delete a dish
const deleteFood = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such food'})
  }

  const food = await Homely.findOneAndDelete({_id: id})

  if (!food) {
    return res.status(400).json({error: 'No such food'})
  }

  res.status(200).json(food)
}

// update a dish
const updateFood = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such food'})
  }

  const food = await Homely.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if (!food) {
    return res.status(400).json({error: 'No such food'})
  }

  res.status(200).json(food)
}


module.exports = {
  getFoods,
  getFood,
  createFood,
  deleteFood,
  updateFood
}