// const express = require('express')
// const authRouter = express.Router() //Old method

const {Router}  = require('express') //New method
const authController = require('../controller/auth.controller')

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


module.exports = router