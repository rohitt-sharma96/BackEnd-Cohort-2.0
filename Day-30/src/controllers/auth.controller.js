

export async function registerUser(req,res,next){
    res.status(201).json({
        message: "user registered successfully"
    })
    
}





// try{
// throw new Error("user already exists,with same email")
//     }
//     catch(err){
//         err.status = 409
//         next(err)
//     }


// try{
    // throw new Error("Encounter new error while creating a new user")
    // }
    // catch(err){
        //     next(err)
        // }

        
    // try{
    //     throw new Error("password is too weak")
    // }
    // catch(err){
    //     err.status = 400
    //     next(err)
    // }