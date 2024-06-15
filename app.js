import express from "express"
import cors from 'cors'
import router from "./router/router.js"

const app = express()
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))
app.use(express.json({limit:"16kb"}));
app.use('/api/v1', router)

export {app}