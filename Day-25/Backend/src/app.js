const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require("cors")

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))



const router = require("./routes/auth.routes")//old method
// const authRouter = require("./routes/auth.routes")// new method (name changed)
app.use("/api/auth", router)

module.exports = app