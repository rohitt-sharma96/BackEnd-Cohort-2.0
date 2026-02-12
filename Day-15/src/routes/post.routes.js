const express = require('express')
const postRouter = express.Router()
const multer = require('multer')
const upload = multer({ storage: multer.memoryStorage() })

const postController = require('../controllers/post.controller')




/* 
POST /api/posts [protected]
- req.body {caption, imageFile}
*/

postRouter.post('/', upload.single('image'), postController.createPostController)



module.exports = postRouter;