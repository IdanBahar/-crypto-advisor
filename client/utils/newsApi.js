import api from './api'

export const getMarketNews = async () => {
  try {
    const response = await api.get('/crypto/news')

    return response.data.data || []
  } catch (error) {
    console.error('Get market news error:', error)
    throw error
  }
}

export default {
  getMarketNews,
}
