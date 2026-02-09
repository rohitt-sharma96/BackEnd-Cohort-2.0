const express = require('express')
const authRouter = express.Router()
const crypto = require('crypto')

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

    const hash = crypto.createHash('md5').update(password).digest('hex')

    const user = await userModel.create({
        email,
        name, 
        password: hash
    })

   const token = jwt.sign({id: user._id, email: user.email}, process.env.JWT_SECRET)

    res.cookie("jwt_token", token)

    res.status(201).json({
        message: "user registered successfully",
        user,
        token

    })
})

authRouter.post('/protected', (req,res)=>{
    console.log(req.cookies)
    res.status(200).json({
        message: "This is a protected route"
    })
})


authRouter.post('/login', async (req, res)=>{
    const {email, password} = req.body;

    const user = await userModel.findOne({email})

    if(!user){
        return res.status(404).json({
            message: "User not found with this email address"
        })
    }

    const isPasswordMatched = user.password === crypto.createHash('md5').update(password).digest('hex');

    if(!isPasswordMatched){
        return res.status(401).json({
            message: "Password Invalid"
        })
    }

    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)
    res.cookie("jwt_token", token)

    res.status(200).json({
        message:"user logged in",
        user
    })
})

module.exports = authRouter;