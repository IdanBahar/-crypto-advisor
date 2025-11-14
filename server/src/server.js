import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import { connectDB } from './config/db.js'
import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'
import cryptoRoutes from './routes/cryptoRoutes.js'
import aiInsightRouter from './routes/aiInsightRoutes.js'
dotenv.config()
const app = express()

app.use(cors())
app.use(express.json())

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Crypto Advisor API' })
})

// Auth Routes
app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/crypto', cryptoRoutes)
app.use('/api/ai-insight', aiInsightRouter)

const PORT = process.env.PORT || 3000

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
  })
})
