const userModel = require('../models/user.model');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

async function registerController(req, res) {
    const { username, email, password, bio, profileImage } = req.body;

    const isUserAlreadyExists = await userModel.findOne({ $or: [{ email }, { username }] })

    if (isUserAlreadyExists) {
        return res.status(409).json({
            message: "user already exists" + (isUserAlreadyExists.email === email) ? "email already exists" : "username already exists"
        })
    }

    const hash = await bcrypt.hash(password, 10)

    const user = await userModel.create({
        username,
        email,
        password: hash,
        bio,
        profileImage
    })
    /* FOR CREATING TOKEN :-
        1. user ka data hona chahiye 
        2. data unique hona chahiye 
    */
    const token = jwt.sign({ "id": user._id, "username": user.username }, process.env.JWT_SECRET, { expiresIn: "1d" })

    res.cookie("token", token)
    res.status(201).json({
        message: 'user registered successfully',
        user: {
            name: user.username,
            email: user.email,
            bio: user.bio,
            profileImage: user.profileImage
        }
    })

}


async function loginController(req, res) {
    const { email, username, password } = req.body;

    /* 
   username
   password
   
   email
   password
    */
    const user = await userModel.findOne({ $or: [{ username: username }, { email: email }] })

    if (!user) {
        return res.status(404).json({
            message: "user not found"
        })
    }



    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
        return res.status(401).json({
            message: "Invalid password"
        })
    }

    const token = jwt.sign({ 'id': user._id, 'username': user.username }, process.env.JWT_SECRET, { expiresIn: "1d" })
    res.cookie('token', token)

    res.status(200).json({
        message: "user logged in successfully",
        user: {
            username: user.username,
            email: user.email,
            bio: user.bio,
            profileImage: user.profileImage
        }
    })
}

async function getMeController(req,res){
    const userId = req.user.id

    const user = await userModel.findById(userId)

    res.status(200).json({
        user:{
            username: user.username,
            email: user.email,
            bio: user.bio,
            profileImage: user.profileImage
        }
    })
}

module.exports = { registerController, loginController, getMeController }