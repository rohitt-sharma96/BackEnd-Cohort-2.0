import express from 'express'
import authRouter from './routes/auth.route.js'
import errorHandle from './middlewares/error.middleware.js'

const app = express()

//middleware
app.use(express.json())




//routes
app.use("/api/auth",authRouter)

//always at bottom of all middleware
app.use(errorHandle)//error handler middleware saare middleware ke niche rehta hai
export default app