/* 
server ko create karna
server ko confing karnaLL



 */

const express = require('express')
const noteModel = require('./models/notes.models')


const app = express()

app.use(express.json())

app.post('/notes', async (req,res)=>{
    const {title, description} = req.body;

    const note = await noteModel.create({
        title,
        description
    })

    res.status(201).json({
        message: 'note create successfully',
        note
    })
})
/* 
/GET /notes
- Fetch all the data from database
 */

app.get('/notes',async (req,res)=>{
    const notes =  await noteModel.find()

    res.status(200).json({
        message: "message get successfully",
        notes
    })
})

module.exports = app;