import api from './api'

export const getCoinPrices = async (coins) => {
  try {
    const params = coins ? { coins: coins.join(',') } : {}
    const response = await api.get('/crypto/coins', { params })
    return response.data
  } catch (error) {
    console.error('Get coin prices error:', error)
    throw error
  }
}

export default {
  getCoinPrices,
}
