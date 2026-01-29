const mongoose = require('mongoose')


const noteSchema = new mongoose.Schema({
    title: String,
    description: String,
})




const noteModel = mongoose.model("notes", noteSchema)//ye line model create krti hai
//"notes" - ye collection ka naam hai


module.exports = noteModel;