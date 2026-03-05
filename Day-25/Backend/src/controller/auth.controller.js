const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')



async function registerUser(req, res) {
    const { username, email, password } = req.body


    const isAlreadyRegistered = await userModel.findOne({ $or: [{ username: username }, { email: email }] })


    if (isAlreadyRegistered) {
        return res.status(400).json({
            message: "user already available"
        })
    }

    const hash = await bcrypt.hash(password, 10)

    const user = await userModel.create({
        username,
        email,
        password: hash
    })

    const token = jwt.sign(
        {
            id: user._id, username: user.username
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "3d"
        }
    )

    res.cookie("token", token)

    res.status(201).json({
        message: "user registered successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}

async function loginUser(req, res) {
    const { username, email, password } = req.body

    const isExist = await userModel.findOne({
        $or: [
            { email },
            { username }
        ]
    })

    if (!isExist) {
        return res.status(404).json({
            message: "Inavlid Credential"
        })
    }

    const isPasswordValid = await bcrypt.compare(password, isExist.password)

    if (!isPasswordValid) {
        return res.status(401).json({
            message: "Invalid Credential"
        })
    }

    const token = jwt.sign(
        {
            id: isExist._id,
            username: isExist.username
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "3d"
        }
    )

    res.cookie("token", token)

    res.status(200).json({
        message: "user logged in successfully",
        user: {
            id: isExist._id,
            user: isExist.username,
            email: isExist.email

        }
    })

}


module.exports = { registerUser, loginUser }