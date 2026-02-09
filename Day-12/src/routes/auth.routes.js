const express = require('express')
const authRouter = express.Router()

const jwt = require("jsonwebtoken")

const userModel = require('../models/user.model')

/* 
 /api/auth/register

 ^ ye sirf prefix hai inka bohot jyada role nhi hai
*/
authRouter.post('/register', async(req,res)=>{
    const {email,name,password} = req.body;
    
    const isUserAlreadyExists = await userModel.findOne({email})

    if(isUserAlreadyExists){
        return res.status(409).json({
            message: "User already exists with this email address"
        })
    }

    const user = await userModel.create({
        email,
        name, 
        password
    })

   const token = jwt.sign({id: user._id, email: user.email}, process.env.JWT_SECRET)

    res.cookie("jwt_token", token)

    res.status(201).json({
        message: "user registered successfully",
        user,
        token

    })
})

module.exports = authRouter;