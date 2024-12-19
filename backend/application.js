import express from 'express'
import dotenv from 'dotenv'

import userRoutes from './src/routes/userRoutes.js'

const app = express()
dotenv.config()


app.use("/api/users",userRoutes)


app.listen(process.env.PORT, () => console.log('Server running'))