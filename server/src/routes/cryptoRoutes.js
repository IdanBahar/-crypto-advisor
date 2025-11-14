import express from 'express'
import { getCoins } from '../controllers/cryptoController.js'
import { authenticateToken } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/coins', authenticateToken, getCoins)

export default router
