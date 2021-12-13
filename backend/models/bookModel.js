const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BookingSchema = new Schema({
    pickUpData:{},
    dropOffData:{},
    fare: {type:Number},
    status: {type:String},
    riderId:{type:String}
},
{
    timestamps: true
}
)
const Booking=mongoose.model('Booking', BookingSchema)
module.exports = Booking