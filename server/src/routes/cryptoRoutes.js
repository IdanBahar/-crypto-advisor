import express from 'express'
import { getCoins, getMarketNews } from '../controllers/cryptoController.js'
import { authenticateToken } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/coins', authenticateToken, getCoins)
router.get('/news', authenticateToken, getMarketNews)

export default router
