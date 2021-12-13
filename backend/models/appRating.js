const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AppRatingSchema = new Schema({
    user:{type: mongoose.Schema.Types.ObjectId , ref: 'Customer'},
    rating: {type: Number}
},
{
    timestamps: true
}
)
const AppRating=mongoose.model('AppRating', AppRatingSchema)
module.exports = AppRating