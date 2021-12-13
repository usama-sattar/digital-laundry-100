const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ShopRatingSchema = new Schema({
    orderId:{type: String},
    rating:{type:Number}
},
{
    timestamps: true
}
)
const ShopRating=mongoose.model('ShopRating', ShopRatingSchema)
module.exports = ShopRating