const express = require('express')
const userModel = require('../models/user.model')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')


const authRouter = express.Router();

/*
  POST  /api/auth/register   
*/
authRouter.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    const isUserExists = await userModel.findOne({ email })
    if (isUserExists) {
        return res.status(409).json({
            message: "Email already exists"
        })
    }


    const user = await userModel.create({
        name,
        email,
        password: crypto.createHash('md5').update(password).digest('hex')
    })
    const token = jwt.sign({ "id": user._id }, process.env.JWT_SECRET, { expiresIn: "1h" })

    res.cookie("token", token)

    res.status(201).json({
        message: "Account registered",
        user:{
            name:user.name,
            email:user.email
        }
    })
})


authRouter.get('/get-me', async (req,res)=>{
    const token = req.cookies.token

    const decoded = jwt.verify(token,process.env.JWT_SECRET)

    const user = await userModel.findById(decoded.id)

    // console.log(decoded)
    res.json({
        name: user.name,
        email:user.email
    })

})


/* 
POST   /api/auth/login
*/
authRouter.post('/login',async(req,res)=>{
    const {email,password} = req.body;

    const user = userModel.findOne({email})

    if(!user){
        return res.status(404).json({
            message: "Email not exists"
        })
    }

    const hash = crypto.createHash('md5').update(password).digest('hex')

    const isValidPassword = hash === user.password

    if(!isValidPassword){
        res.status(401).json({
            message: 'Password Invalid'
        })
    }   

    const token = jwt.sign({id:user._id}, process.env.JWT_SECRET,{expiresIn: "1h"})

    res.cookie("token",token)

    res.json({
        message:"user logged in successfully",
        user:{
            name:user.name,
            email:user.email
        }
    })
})




module.exports = authRouter;