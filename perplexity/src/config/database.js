import mongoose from "mongoose"

function connectDB(){
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("server is connected to DB")
    })
    .catch((err)=>{
        console.log("error connecting to DB",err)
    })
}

export default connectDB