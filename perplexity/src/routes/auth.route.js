import { Router } from "express";

import { registerValidator,loginValidator } from "../validators/auth.validator.js";
import { registerUser, verifyEmail, loginUser, getMe } from "../controllers/auth.controller.js";
import { getUser } from "../middlewares/auth.middleware.js";

const authRouter = Router()




/**
 * @route POST /api/auth/register
 * @desc register a new user
 * @access Public
 * @body {username,email,password}
 */
authRouter.post("/register", registerValidator, registerUser)



/**
 * @route POST /api/auth/login
 * @desc login user and return JWT token
 * @access Public
 * @body {email,password}
 */
authRouter.post("/login", loginValidator, loginUser)


/**
 * @route GET /api/auth/get-me
 * @desc get current logged in user's information
 * @access Private
 */
authRouter.get("/get-me",getUser,getMe)


/**
 * @route /api/auth/verify-email   //?token=sdfadsosowodnsoeslwodkwoswosslsdlfssl
 * @desc verify user's email address
 * @access Public
 * @query {token}
 */
authRouter.get("/verify-email", verifyEmail)



export default authRouter