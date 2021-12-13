const express = require("express");
const router = express.Router();
const Customer = require('../models/customerModel')
const Vendor = require('../models/vendorModel')
const Rider = require('../models/riderModel')
const AppRating = require('../models/appRating')
const Order = require('../models/orderModel')
const Shop = require('../models/shopModel')

router.get("/count", async(req,res)=>{
    var customerCount, vendorCount, riderCount
    var customerQuery = await Customer.find().countDocuments(function(err,count){customerCount = count});
    var vendorQuery = await Vendor.find().countDocuments(function(err,count){vendorCount=count})
    var riderQuery = await Rider.find().countDocuments(function(err,count){riderCount = count})

      res.send([
        {"name": "customer", "count": customerCount},
        {"name": "vendor", "count": vendorCount},
        {"name": "rider", "count": riderCount},
      ])    
})
router.get("/rating", async(req,res)=>{
    AppRating.find({$query: {},$orderby: {$natural : -1}}).limit(10)
    .then(result =>res.send(result))
    .catch(err=>console.log(err))
})
router.get("/order", (req, res)=>{
    Order.find({}).sort({_id: -1}).limit(5).then((order) => {
        res.send(order)
    })
})
router.delete("/delete/order/:id", (req, res) => {
    Order.findByIdAndDelete(req.params.id)
      .then(() => {
        res.send("order deleted");
      })
      .catch((err) => console.log(err));
  });
router.delete("/delete/customer/:id", (req, res) => {
    Customer.findByIdAndDelete(req.params.id)
        .then(() => {
        res.send("user deleted");
        })
        .catch((err) => console.log(err));
    });
router.delete('/delete/vendor/:id', (req,res)=>{
    Vendor.findByIdAndDelete(req.params.id)
    .then(()=>{
        Shop.find({vendor:req.params.id})
        .then(() => {res.send("successfully deleted")})
        .catch((err) => console.log(err));
    })
    .catch((err)=> console.log(err))
})
router.delete('/delete/rider/:id', (req,res)=>{
    Rider.findByIdAndDelete(req.params.id)
    .then(()=>{res.send("user deleted")})
    .catch((err)=> console.log(err))
    
})
router.delete("/delete/shop/:id", (req, res) => {
    Shop.findByIdAndDelete(req.params.id)
      .then(() => {
        res.send("shop deleted");
      })
      .catch((err) => console.log(err));
  });
module.exports = router