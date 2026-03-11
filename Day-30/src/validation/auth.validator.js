import { body, validationResult } from "express-validator"


const validate = (req, res, next) => {
    const errors = validationResult(req)

    if (errors.isEmpty()) {//agar ye khali raha to (koi error nhi h)
        return next()// tb ye line chalega jo middleware tk le jayega
    }

    res.status(400).json({
        errors: errors.array()
    })
}


export const registerValidation = [
    body("username").isString().withMessage("username should be string"),
    body("email").isEmail().withMessage("email should be valid email address"),
    body("password").isLength({ min: 6,max:12 }).withMessage("password should be between 6 to 12 characters"),
    validate

]


// Custorm regex based 
// [
// body("password").custom((value)=>{
//     if(value<6){
//         throw new Error("password should be atleast 6 character")
//     }
//     const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
//     if(!passwordRegex.test(value)){
//         throw new Error("password not match the regex")
//     }
//     return true
// }).withMessage("password should be atleast 6 character long and match regex "),
//     validate
// ]