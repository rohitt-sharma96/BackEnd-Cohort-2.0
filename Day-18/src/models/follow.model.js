const mongoose = require('mongoose')

const followSchema = new mongoose.Schema({
    follower: {
      type: String 
    },
    followee: {
        type: String
    },
    status:{
        type:String,
        default: "pending",
        //enum means :- status value ki kya-kya properties ho skti h (ye 3 hi hota h)
        enum:{
            values:["pending", "accepted", "rejected"],
            message: "status can only be pending, accepted or rejected"
        }
    }
}, {
    timestamps: true
})

followSchema.index({follower: 1, followee: 1}, {unique: true})

const followModel = mongoose.model('follow',followSchema)

module.exports = followModel;