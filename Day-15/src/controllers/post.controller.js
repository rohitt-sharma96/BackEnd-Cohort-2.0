const postModel = require('../models/post.model')
const imageKit = require('@imagekit/nodejs')
const { toFile } = require('@imagekit/nodejs')
const jwt = require('jsonwebtoken')

const imagekit = new imageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})




async function createPostController(req, res) {
    console.log(req.body, req.file)

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
    
    
    
    const file = await imagekit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), 'file'),
        fileName: 'Test',
        folder: 'cohor-2-InstaClone-posts'
    })
  

    const post = await postModel.create({
        caption: req.body.caption,
        imgUrl: file.url,
        user: decode.id
    })



    res.status(201).json({
        message:"post create successfully",
        post
    })


}




module.exports = { createPostController }