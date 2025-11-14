import api from './api'

export const fetchAiInsight = async () => {
  try {
    const response = await api.get('/ai-insight')
    return response.data
  } catch (error) {
    console.error('Get Insight error:', error)
    throw error
  }
}

export default {
  fetchAiInsight,
}
