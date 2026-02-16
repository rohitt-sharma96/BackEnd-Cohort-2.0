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




/* 
GET /api/posts  [protected]
*/

postRouter.get('/',postController.getPostController)




/* 
GET /api/posts/details/:postId  [protected] <- mtlb token rehna chahiye
- return a detail about specific post with the id. also check whether the post belongs to the user that the request come from
*/

postRouter.get('/details/:postId',postController.getPostDetailsController)

module.exports = postRouter;