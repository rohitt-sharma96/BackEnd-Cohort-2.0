import { Router } from "express";

import { registerValidator } from "../validators/auth.validator.js";
import { registerUser } from "../controllers/auth.controller.js";

const authRouter = Router()




/**
 * @route /api/auth/register
 * @description register a new user
 * @access public
 * @body {username,email,password}
 */
authRouter.post("/register", registerValidator, registerUser)



export default authRouter