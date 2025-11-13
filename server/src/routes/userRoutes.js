import express from 'express'
import {
  updatePreferences,
  getUserProfile,
} from '../controllers/userController.js'
import { authenticateToken } from '../middleware/authMiddleware.js'

const router = express.Router()

router.put('/preferences', authenticateToken, updatePreferences)
router.get('/profile', authenticateToken, getUserProfile)

export default router
