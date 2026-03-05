const express = require('express')
const cookieParser = require('cookie-parser')

const app = express()

app.use(express.json())
app.use(cookieParser())



const router = require("./routes/auth.routes")//old method
// const authRouter = require("./routes/auth.routes")// new method (name changed)
app.use("/api/auth",router)

module.exports = app