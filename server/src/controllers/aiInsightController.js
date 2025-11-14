import { getAiInsightFromLLM } from '../services/aiInsightService.js'

export async function getAiInsight(req, res) {
  try {
    const data = await getAiInsightFromLLM()
    return res.json(data)
  } catch (err) {
    console.error('Error in getAiInsight:', err)
    return res.status(500).json({ message: 'Failed to fetch AI insight' })
  }
}
