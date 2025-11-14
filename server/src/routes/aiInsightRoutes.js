import { Router } from 'express'
import { getAiInsight } from '../controllers/aiInsightController.js'

const router = Router()

router.get('/', getAiInsight)

export default router
