const postModel = require('../models/post.model')
const imageKit = require('@imagekit/nodejs')
const { toFile } = require('@imagekit/nodejs')
const { config } = require('dotenv')
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


async function getPostController(req,res){
    const token = req.cookies.token

     if(!token){
            return res.status(401).json({
                message:"UnAuthorized Access"
            })
        }

    let decode;
    
    try{
        decode = jwt.verify(token,process.env.JWT_SECRET)
    }
    catch(err){
        return res.status(401).json({
            message: "Invalid token"
        })
    }

    const userId = decode.id

    const posts = await postModel.find({ user:userId })

    res.status(200).json({
        message:"posts fetched successfully",
        posts
    })
}



async function getPostDetailsController(req,res){
        const token = req.cookies.token

        if(!token){
            return res.status(401).json({
                message:"UnAuthorized Access"
            })
        }

        let decoded;

        try{

            decoded = jwt.verify(token,process.env.JWT_SECRET)
        }
        catch(err){
            return res.status(401).json({
                message: "UnAuthorized Token."
            })
        }

        const userId = decoded.id
        const postId = req.params.postId
        
        const post = await postModel.findById(postId)

        if(!post){
            return res.status(404 ).json({
                message: "post not found"
            })
        }

        const isValidUser = post.user.toString() === userId

        if(!isValidUser){
            return res.status(403).json({
                message: "Forbidden Content."
            })
        }
        res.status(200).json({
            message: "post fetched",
            post
        })
}

module.exports = { createPostController, getPostController, getPostDetailsController }