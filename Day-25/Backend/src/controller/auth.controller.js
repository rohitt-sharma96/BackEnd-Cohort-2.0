const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const blacklistModel = require("../models/blacklist.model")

const redis = require("../config/cache")


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
    }).select("+password")

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

async function getMe(req, res) {
    const user = await userModel.findById(req.user.id)
    res.status(200).json({
        message: "User fetched successfully",
        user
    })
}

async function logoutUser(req, res) {

    const token = req.cookies.token

    res.clearCookie("token")

    await redis.set(token, Date.now().toString(), "EX", 60 * 60)

    res.status(200).json({
        message: "logout successfully"
    })
}

module.exports = { registerUser, loginUser, getMe, logoutUser }