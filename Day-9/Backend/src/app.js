const express = require('express')
const noteModel = require('./models/note.model')
const path = require('path')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors());
app.use(express.static('./public'))

/* 
POST /api/notes
 -   creating the note And store in DataBase
 */
app.post('/api/notes', async (req, res) => {
    const { title, description } = req.body;

    const note = await noteModel.create({
        title,
        description
    })

    res.status(201).json({
        message: 'note created successfully',
        note
    })
})

/* 
GET  /api/notes
- This api will fetch the data from Database 
 */
app.get('/api/notes', async (req, res) => {
    const notes = await noteModel.find()
    res.status(200).json({
        message: 'all note are fetched ',
        notes
    })
})

/* 
DELETE /api/notes/:id
- Delete a note with the help of their id
 */

app.delete('/api/notes/:id',async (req,res)=>{
    await noteModel.findByIdAndDelete(req.params.id)

   res.status(200).json({
    message: 'note deleted successfully.'
   })
})

/* 
PATCH /api/notes/:id
- Update the content of the note
 */

app.patch('/api/notes/:id', async (req,res)=>{
    const {description} = req.body
    const id = req.params.id
    await noteModel.findByIdAndUpdate(id, {description})

    res.status(200).json({
        message: 'Note updated successfully.'
    })
})
//Iska kaam hai ki user galti se kisi dusre server pe request krde to humein kya dikhana ya hai 
// Us api pe req. krde jo humne create hi nhi ki hai to us jagah pe hum ye api dikha skte hai
app.use('*name', (req,res)=>{
    res.sendFile(path.join(__dirname,"..","/public/index.html"))
})





module.exports = app;