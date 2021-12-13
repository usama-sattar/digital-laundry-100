const express = require("express");
const router = express.Router();
const Customer = require("../models/customerModel");
const Order = require('../models/orderModel')
const AppRating = require('../models/appRating')
const stripe = require("stripe")(process.env.SECRET_KEY);

router.get("/total", (req, res) => {
  Customer.find()
    .then((user) => res.json(user))
    .catch((err) => console.log(err));
});
router.get("/orders", (req, res) => {
  Order.find()
    .then((result) => res.json(result))
    .catch((err) => console.log(err));
});
router.get("/:id", (req, res) => {
  Customer.find({_id: req.params.id})
    .then((user) => res.json(user))
    .catch((err) => console.log(err));
});

router.get("/current/:id", (req, res) => {
  console.log(req.params.id);
  Customer.findById(req.params.id)
    .then((user) => res.json(user))
    .catch((err) => console.log(err));
});
router.post("/update/:id", (req, res) => {
  Customer.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name, phone: req.body.phone },
    function (err, docs) {
      if (err) {
        console.log(err);
      } else {
        console.log("success");
      }
    }
  );
});
router.post("/create-payment",async (req, res) => {
  const { price } = req.body;
  const paymentIntent = await stripe.paymentIntents.create({
    amount: (price* 100),
    currency:'inr',
    payment_method_types: ['card'],
  })
    const clientSecret = await paymentIntent.client_secret
    try{
      res.send(clientSecret)
    }
    catch(err){
      res.send(`error: ${err}`)
    }
});

router.post("/rating/:id",async (req, res) => {
  const { rating } = req.body;
  const ratingRecord = await new AppRating({
    user: req.params.id,
    rating: rating
  })
  const result = ratingRecord.save()
  try{
      res.send(result)
  }
  catch(err){
     res.send(`error: ${err}`)
  }
});

router.get("/rating/:id",async (req, res) => {
  const result = await AppRating.findById(req.params.id)
  try{
      res.send(result)
  }
  catch(err){
     res.send(`error: ${err}`)
  }
});

router.post("/order",async (req, res) => {
  const { customerId,name,email,address,contact,cart,total, status,vendor,vendorId,} = req.body;
  const orderRecord = await new Order({
    customerId,name,email,address,contact,cart,total,status,vendor,vendorId
  })
  const result = orderRecord.save()
  try{
      res.send(result)
  }
  catch(err){
     res.send(`error: ${err}`)
  }
});

router.get("/orders/:id",async (req, res) => {
  const ordersRecord = await Order.find({customerId: req.params.id})
  try{
      res.send(ordersRecord)
  }
  catch(err){
     res.send(`error: ${err}`)
  }
});


module.exports = router;
