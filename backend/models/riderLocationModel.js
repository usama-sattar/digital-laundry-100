const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RiderLocationSchema = new Schema({
    riderId:{type: mongoose.Schema.Types.ObjectId , ref: 'Rider'},
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
    socketId :{type: String}
},
{
    timestamps: true
}
)
RiderLocationSchema.index({"coordinate": "2dsphere"})
const RiderLocation=mongoose.model('RiderLocation', RiderLocationSchema)
module.exports = RiderLocation