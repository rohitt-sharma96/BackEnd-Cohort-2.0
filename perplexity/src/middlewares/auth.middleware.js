import jwt from 'jsonwebtoken'

export async function getUser(req, res, next) {
    const token = req.cookies.token

    if (!token) {
        return res.status(401).json({
            message: "Unauthorized",
            success: false,
            err: "token not provided"
        })
    }

    let decoded = null
    
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)

        req.user = decoded;
        next()
    }
    catch (err) {
        return res.status(401).json({
            message: "Unauthorized",
            success: false,
            err: "Invalid token"
        })
    }
}