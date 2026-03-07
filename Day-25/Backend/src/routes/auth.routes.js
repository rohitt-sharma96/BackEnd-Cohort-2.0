// const express = require('express')
// const authRouter = express.Router() //Old method

const { Router }  = require('express') //New method
const authController = require('../controller/auth.controller')


const authMiddleware = require("../middlewares/auth.middleware")

const router = Router();


/**
 * @route /api/auth/register
 * @description this api will register the user into db
 * @access public
 */

router.post("/register",authController.registerUser)


/**
 * @route /api/auth/login
 * @description this api will login the user that are already registered
 * @access public 
 */
router.post("/login",authController.loginUser)



/**
 * @route /api/auth/get-me
 * @description  this api will give user information 
 * @access private
 */
router.get("/get-me",authMiddleware.authUser, authController.getMe)


/**
 * @route /api/auth/logout
 * @description this api will logout the user by clearing the cookie
 * @access private
 */

router.get("/logout",authController.logoutUser)

module.exports = router