const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ShopSchema = new Schema({
    name: {type: String},
    vendor: {type: mongoose.Schema.Types.ObjectId , ref: 'Vendor'},
    address: {type: String},
    account: {type:String},
    services: [{}],
    image:{type:String},
    coordinate: {
        type: {
            type: String, 
            enum: ['Point'], 
            required: true
          },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    location: {type:String},
    rating:{
        type: Array,
        min: 1,
        max: 5
    },
    email: {type:String},
    image: {type: String}
})
ShopSchema.index({"coordinate": "2dsphere"})
const Shop=mongoose.model('Shop', ShopSchema)
module.exports = Shop