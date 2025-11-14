import express from 'express'
import { updateUserVote } from '../models/User.js'
import { authenticateToken } from '../middleware/authMiddleware.js'

const router = express.Router()

// mounted in server as '/api/vote' -> handle PUT to '/api/vote' at router '/'
router.put('/', authenticateToken, async (req, res) => {
  try {
    const { section, vote } = req.body
    const userId = req.userId || req.user?.id
    await updateUserVote(userId, section, vote)
    res.json({ success: true })
  } catch (error) {
    res.status(500).json({ error: 'Failed to save vote' })
  }
})

export default router
