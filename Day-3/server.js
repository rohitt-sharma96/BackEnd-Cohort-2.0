const express = require('express')

const app = express()



const notes = [];

app.use(express.json())

app.get('/',(req,res)=>{
    res.send('Hello World!')
})

app.get('/about', (req,res)=>{
    res.send('This is about page')
})

app.post('/notes', (req,res)=>{
    console.log(req.body)
    notes.push(req.body)
    res.send('notes created')
})

app.listen(3000,()=>{
    console.log('server is running on port 3000')
})