const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RiderSchema = new Schema({
    name:{type: String, required: true},
    phone:{type: Number, required: true},
    cnic: {type: Number, required: true},
    license: {type: Number, required: true}    
},
{
    timestamps: true
}
)
const Rider=mongoose.model('Rider', RiderSchema)
module.exports = Rider