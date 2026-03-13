import {body, validationResult} from 'express-validator'


const validate = (req,res,next)=>{
    const error = validationResult(req)

    if(error.isEmpty()){
        return next()
    }

    res.status(400).json({
        errors: error.array()
    })
}

export const registerValidator = [
    body("username").isString().withMessage("username should be string"),
    body("email").isString().withMessage("email should be string"),
    body("password").isLength({min:6,max:12}).withMessage("password should be between 6 to 12 characters"),
    validate
]