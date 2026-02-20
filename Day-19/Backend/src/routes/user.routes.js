const express = require('express')

const userController = require('../controllers/user.controller')
const identifyUser = require('../middlewares/auth.middleware')

const userRouter = express.Router();



/**
 * @route POST /api/users/follow/:username (kisko follow krna chahte ho)
 * @description Follow a user
 * @access Private
 */
userRouter.post('/follow/:username', identifyUser, userController.followUserController)


/**
 * @route POST /api/users/unfollow/:username (kise unfollow krna hai)
 * @description Unfollow a user
 * @access Private
 */
userRouter.post('/unfollow/:username', identifyUser, userController.unfollowUserController)



/**
 * @route POST /api/users/accept/:userId
 */
userRouter.post('/accept/:username', identifyUser, userController.acceptFollowController)



/**
 * @route POST /api/users/reject/:username
 */
userRouter.post('/reject/:username', identifyUser, userController.rejectFollowController)



module.exports = userRouter;
