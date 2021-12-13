const express = require('express')
const router = express.Router();

const Rider= require('../models/riderModel')

router.get('/total', (req,res)=>{
    Rider.find()
    .then((user)=> res.json(user))
    .catch((err)=> console.log(err))
})
router.get('/:id', (req,res)=>{
    Rider.findById(req.params.id)
    .then((user)=> res.send(user))
    .catch((err)=> console.log(err))
})
module.exports=router
