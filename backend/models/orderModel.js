const mongoose = require('mongoose')
const Schema = mongoose.Schema

const OrderSchema = new Schema({
    customerId: {type: mongoose.Schema.Types.ObjectId , ref: 'Customer'},
    name: {type: String},
    email: {type: String},
    address: {type: String},
    contact: {type: String},
    vendorId: {type: mongoose.Schema.Types.ObjectId , ref: 'Vendor'},
    vendor: {type:String},
    cart: [{}],
    total: {type:String},
    status: {type:String},
    date: {type: Date, default: Date.now()}
},)

const Order=mongoose.model('Order', OrderSchema)
module.exports = Order