const express = require("express");
const router = express.Router();
const Shop = require("../models/shopModel");
var multer = require("multer")
var path = require('path');
const ShopRating = require('../models/shopRating')

var Storage= multer.diskStorage({
  destination:"./public/uploads",
  filename: (req,file,cb)=>{
    cb(null,file.fieldname+"_"+Date.now()+path.extname(file.originalname));
  }
})

var upload=multer({
  storage: Storage,
})

router.get("/", (req, res) => {
      Shop.aggregate(([ {$addFields : {average : {$avg : "$rating"}}} ]))
      .then(result=>res.send(result))
      .catch(err=>console.log(err))
});

router.get("/:id" , (req,res)=>{
  Shop.findOne({vendor: req.params.id})
    .then((shop) => res.json(shop))
    .catch((err) => console.log(err));
})
router.get('/:vendorId', (req,res)=>{
  Shop.find({vendor: req.params.vendorId})
  .then((shop)=> res.json(shop))
  .catch((err)=> console.log(err))
})

router.post("/create",  (req, res) => {
      const shop = new Shop({
        name: req.body.name,
        address: req.body.address,
        account: req.body.account,
        vendor: req.body.vendorId,
        services: req.body.services,
        coordinate: req.body.coordinates,
        location: req.body.location,
        email: req.body.email
      });
      shop
        .save()
        .then((data) => {
          console.log("shop created");
          res.send(data);
        })
        .catch((err) => console.log(err));
} 
);
router.post("/create/shopImage",upload.single('file'), (req,res)=>{
  console.log(req.file)
})
router.post("/update/:id", (req,res)=>{
  Shop.findByIdAndUpdate(req.params.id,
    { 
      services: req.body.services
    },
    function (err, result) {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
})

router.get("/nearby/:longitude/:latitude", async (req, res) => {
  Shop.ensureIndexes({"coordinate": "2dsphere"})
  Shop.find({
    "coordinate": {
      "$near": {
        "$geometry": {
          "type": "Point",
          "coordinates": [
            parseFloat(req.params.longitude),
            parseFloat(req.params.latitude)
          ],
        },
        "$maxDistance": 100000
      }
    }
  })
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
});
router.get("/search/:name", async(req, res) => {
    const data = await Shop.find({
      name: { $regex: req.params.name, $options: "i" },
    });  
  try {
    res.send(data);
  } catch (err) {
    res.status(400).send(err);
  }
});
router.get("/find/:name", async(req, res) => {
  const data = await Shop.find({
    name: req.params.name ,
  });
  try {
    if(data.length > 0) {res.send(true);}
    else {res.send(false)}
  } catch (err) {
    res.status(400).send(err);
  }
 });
router.post("/rating/:id/:orderId", async (req,res)=>{
  Shop.findOneAndUpdate({vendor: req.params.id}, 
  {$push: {'rating': req.body.rating}}, 
  {new: true}, async (err, result) =>  {
      if(err){
          res.status(400).send(err)
      }
      else{
          const newObj = await new ShopRating({
            orderId: req.params.orderId,
            rating: req.body.rating
          })
          newObj.save().then(res.send(true)).catch(err=>console.log(err))
      }
 })
})
router.get("/avg/rating", (req,res)=>{
  Shop.aggregate(([ {$addFields : {average : {$avg : "$rating"}}} ]))
  .then(result=>res.send(result))
  .catch(err=>console.log(err))
})
router.get("/order/rating/:id", (req,res)=>{
  ShopRating.find({orderId: req.params.id}).then(result=> res.send(result)).catch(err=>console.log(err))
})
router.get("/delete/:id", (req,res)=>{
   Shop.findByIdAndDelete(req.params.id).then(result => res.json(true)).catch(err => console.log(err))
  res.json(true)
})

module.exports = router;
