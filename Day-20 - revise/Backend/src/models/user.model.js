const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        unique: [true,"user name is already exists"],
        required: [true,"user name is required"]
    },
    email:{
        type: String,
        unique:[true,"email is already exists"],
        required:[true,"email is required"]
    },
    password:{
        type:String,
        required:[true,"password is required"]
    },
    
    bio: String,

    profileImage:{
        type: String,
        default:"https://ik.imagekit.io/u9fcxeowj/avatar-gender-neutral-silhouette-vector-600nw-2470054311.webp"
    }
})



const userModel = mongoose.model('user',userSchema)

module.exports = userModel;