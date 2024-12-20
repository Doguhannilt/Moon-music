import express from 'express'
import dotenv from 'dotenv'

// Middleware(s)
import { clerkMiddleware } from '@clerk/express'
import { encryption } from './src/utils/encryption.js'
import path from 'path'
// Routes
import userRoutes from './src/routes/userRoutes.js'
import authRoutes from './src/routes/authRoutes.js'
import adminRoutes from './src/routes/adminRoutes.js'
import songRoutes from './src/routes/songRoutes.js'
import albumRoutes from './src/routes/albumRoutes.js'
import statRoutes from './src/routes/statRoutes.js'
import connectDB from './src/database/connection.js'
import fileUpload from 'express-fileupload'


const app = express()
const __dirname = path.resolve()

dotenv.config()

// Middleware(s)
app.use(express.json())
app.use(clerkMiddleware({ publicKey: process.env.CLERK_SECRET_KEY }))
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, 'tmp'),
    createParentPath: true,
    limits: {
        fileSize: 10 * 1024 * 1024
    },
}))

// Clerk Secret Key
const key = process.env.CLERK_SECRET_KEY
console.log("Clerk Secret Key"+ encryption(key)) // For debugging

// Routes
app.use("/api/users", userRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/admin", adminRoutes)
app.use("/api/songs", songRoutes)
app.use("/api/albums", albumRoutes)
app.use("/api/stats", statRoutes)

app.use((err,req,res,next) => {
    res.status(404).json({message: process.env.NODE_ENV === 'development' ? err.stack : err.message})
})

// Connect to MongoDB
connectDB()

app.listen(process.env.PORT, () => console.log('Server running'))