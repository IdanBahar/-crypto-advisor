import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import { connectDB } from './config/db.js'
import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'
import cryptoRoutes from './routes/cryptoRoutes.js'
import aiInsightRouter from './routes/aiInsightRoutes.js'
import voteRoutes from './routes/voteRoutes.js'

dotenv.config()
const app = express()

const allowedOrigins = [
  'https://crypto-adv.netlify.app',
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:3000',
]

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}

app.use(cors(corsOptions))
app.options('*', cors(corsOptions))
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
app.use('/api/vote', voteRoutes)

const PORT = process.env.PORT || 3000

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
  })
})
