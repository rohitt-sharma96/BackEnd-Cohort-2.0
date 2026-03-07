const mongoose = require("mongoose")

const userSchmea = new mongoose.Schema({
    username:{
        type: String,
        required: [true,"username is required"],
        unique: [true,"username should be unique"]
    },

    email:{
        type: String,
        required: [true, "email is required"],
        unique: [true,"email should be unique"]
    },
    password:{
        type: String,
        required: [true,"Password is required"],
        select: false
    }
})
// TASK 
// userSchema.pre("save",function(next){})
// userSchema.post("save",function(next){})

const userModel  = mongoose.model("users",userSchmea)

module.exports = userModel
