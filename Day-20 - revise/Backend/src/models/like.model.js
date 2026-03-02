const mongoose = require('mongoose')


const likeSchema = new mongoose.Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "posts",
        required: [true, "post id is required for create a like "]
    },
    user: {
        type: String,
        required: [true, "username is required for creating a like"]
    }
}, { timeseries: true })


//Ek user ek post ko ek hi baar like kr sake
likeSchema.index({post:1, user:1}, {unique:true})


const likeModel = mongoose.model('likes',likeSchema)

module.exports = likeModel;