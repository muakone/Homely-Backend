const Cart = require('../models/homelyCartModel')
const mongoose = require('mongoose')

// get carts
const getCarts = async (req, res) => {
  const user_id = req.user._id

  const cart = await Cart.find({user_id}).sort({createdAt: -1})

  res.status(200).json(cart)
}

// get a single cart
const getCart = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'cart not added'})
  }

  const cart = await Cart.findById(id)

  if (!cart) {
    return res.status(404).json({error: 'cart not added'})
  }
  
  res.status(200).json(cart)
}


// create new cart
const addCart = async (req, res) => {
    const {name, price, img} = req.body

  let emptyFields = []

  if(!name) {
    emptyFields.push('name')
  }
  if(!price) {
    emptyFields.push('price')
  }
  if(!img) {
    emptyFields.push('img')
  }
  if(emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
  }

  // add doc to db
  try {
    const user_id = req.user._id
    const cart = await Cart.create({name, price, img, user_id})
    res.status(200).json(cart)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// delete a cart
const deleteCart = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such cart'})
  }

  const cart = await Cart.findOneAndDelete({_id: id})

  if (!cart) {
    return res.status(400).json({error: 'No such cart'})
  }

  res.status(200).json(cart)
}

// update a cart
const updateCart = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such cart'})
  }

  const cart = await Cart.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if (!cart) {
    return res.status(400).json({error: 'No such cart'})
  }

  res.status(200).json(cart)
}


module.exports = {
  getCarts,
  getCart,
  addCart,
  deleteCart,
  updateCart
}