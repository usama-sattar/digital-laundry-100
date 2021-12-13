const express = require('express')
const router = express.Router();
const Vendor= require('../models/vendorModel')
const Order = require('../models/orderModel')

router.get('/total', (req,res)=>{
    Vendor.find()
    .then((user)=> res.json(user))
    .catch((err)=> console.log(err))
})
router.get('/:vendorId', (req,res)=>{
    Vendor.find({_id: req.params.vendorId})
    .then((user)=> res.json(user))
    .catch((err)=> console.log(err))
})

router.get('/pending/:id', (req,res)=>{
    Order.find({vendorId: req.params.id, status: 'pending'})
    .then((data)=>{res.send(data)})
    .catch((err)=> console.log(err))
})

router.post('/pending/:id', (req,res)=>{
    Order.findOneAndUpdate({vendorId: req.params.id},{
        status: req.body.status
    })
    .then(()=>{res.send("status changed")})
    .catch((err)=> console.log(err))    
})

router.get('/fullfilled/:id', (req,res)=>{
    Order.find({vendorId: req.params.id, status: 'completed'})
    .then((data)=>{res.send(data)})
    .catch((err)=> console.log(err))
})

router.get('/total/pending/:id', async(req,res)=>{
    var total=0;
    const record = await Order.find({vendorId: req.params.id, status: "pending"}).countDocuments(function(err,count) {total = count})
    res.status(200).send((total).toString())
})
router.get('/total/fullfilled/:id', async(req,res)=>{
    var total=0;
    const record = await Order.find({vendorId: req.params.id, status: "completed"}).countDocuments(function(err,count) {total = count})
    res.status(200).send((total).toString())
})

module.exports=router
