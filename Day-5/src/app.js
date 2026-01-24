// server ko create karna
// server ko config karna


const express = require('express')


const app = express();

app.use(express.json())

const notes = []

// POST /notes 
app.post('/notes', (req,res)=>{

    console.log(req.body)
    notes.push(req.body)

    res.status(201).json({message: 'notes created'})
})

// GET /notes 
app.get('/notes', (req, res)=>{
    res.status(200).json({
        notes: notes
    })
})

/*  DELETE /notes:index  */
app.delete('/notes/:idx', (req, res)=>{
    delete notes[req.params.idx]

    res.status(200).json({ message: "notes deleted."})
})


/* PATCH /notes/:idx*/

app.patch('/notes/:idx',(req,res)=>{
    
    notes[req.params.idx].description = req.body.description

    res.status(200).json({message: "notes updated."})
})




module.exports  = app;