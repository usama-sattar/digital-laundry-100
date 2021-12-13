const mongoose = require('mongoose')
const Schema = mongoose.Schema

const VendorSchema = new Schema({
    name:{type: String, required: true},
    phone:{type: Number, required: true},
    cnic: {type: Number, required: true}
},
{
    timestamps: true
}
)
const Vendor=mongoose.model('Vendor', VendorSchema)
module.exports = Vendor