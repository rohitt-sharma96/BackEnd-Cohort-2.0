const jwt = require('jsonwebtoken')

function identifyUser(req,res,next){
    
    const token = req.cookies.token

    if (!token) {
        return res.status(401).json({
            message: "Token not provided, Unauthorized"
        })
    }

    let decode = null;

    try {
        decode = jwt.verify(token, process.env.JWT_SECRET)
    }
    catch (err) {
        return res.status(401).json({
            message: "unauthorized access, token unmatched."
        })
    }

    req.user = decode //user ki value req mein daalke aagey forward krte hai. 

    next() // middleware se req forward krne ke liye controller tk next() ka use krte hai.
}

module.exports = identifyUser;