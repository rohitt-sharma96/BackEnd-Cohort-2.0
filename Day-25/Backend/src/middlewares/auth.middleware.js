const blacklistModel = require("../models/blacklist.model")
const userModel = require("../models/user.model")
const redis = require("../config/cache")
const jwt = require("jsonwebtoken")

async function authUser(req, res, next) {
    const token = req.cookies.token

    if (!token) {
        return res.status(401).json({
            message: "Token not provided"
        })
    }

    const isBlackListed = await redis.get(token) 

    if(isBlackListed){
        return res.status(401).json({
            message: "token is blacklisted"
        })
    }
    
    

    let decoded = null

    try {

        decoded = jwt.verify(token, process.env.JWT_SECRET)

        req.user = decoded //req.user <- isko yahi pe create kr rhe hai piche khi nhi tha
        next(); // ye req.user wali value ko aagey bhejega
    }
    catch (err) {
        res.status(401).json({
            message: "Invalid token"
        })

    }


}


module.exports = { authUser }