const express = require('express')
const postRouter = express.Router()


const multer = require('multer')
const upload = multer({ storage: multer.memoryStorage() })


const identifyUser = require('../middlewares/auth.middleware')
const postController = require('../controllers/post.controller')





/**
 * @route POST /api/posts [protected]
 * @description Crate a post with the content and image provided in 
 */

postRouter.post('/', upload.single('image'), identifyUser , postController.createPostController)




/** 
* @route GET /api/posts [protected]
* @description GET  all the posts created by the user that the request come from. also return the total number of posts created by user
*/

postRouter.get('/', identifyUser, postController.getPostController)



/**
 * @route GET /api/posts/details/:postId [protected]
 * @description return the detail about specific post with the id. also check whether the post belongs to the user that the request come from
 */

postRouter.get('/details/:postId', identifyUser ,postController.getPostDetailsController)



/**
 * @route POST /api/posts/like/:postId
 * @description like a post with the id provided in the request params
 */

postRouter.post('/like/:postId', identifyUser, postController.likePostController)



module.exports = postRouter;