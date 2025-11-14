import '../config/env.js'
import axios from 'axios'

const CRYPTOPANIC_API = 'https://cryptopanic.com/api/v1'
const API_KEY = process.env.CRYPTOPANIC_API_KEY || null

// console.log('🔑 CryptoPanic API Key:', API_KEY ? 'Found ✅' : 'Not found ❌')

export const getNews = async (filter = 'rising', currencies = null) => {
  try {
    const params = {
      auth_token: API_KEY,
      filter: filter,
      kind: 'news',
      public: API_KEY ? undefined : true,
    }

    if (currencies && currencies.length > 0) {
      params.currencies = currencies.join(',')
    }

    // console.log('📡 Calling CryptoPanic API with params:', params)

    const response = await axios.get(`${CRYPTOPANIC_API}/posts/`, { params })

    console.log(
      '✅ CryptoPanic API Success! Got',
      response.data.results?.length || 0,
      'news items'
    )

    return response.data.results || []
  } catch (error) {
    console.error(
      '❌ CryptoPanic API Error:',
      error.response?.status,
      error.response?.data || error.message
    )

    console.log('⚠️ Using fallback news')
    return getFallbackNews()
  }
}

const getFallbackNews = () => {
  return [
    {
      id: 1,
      title: 'Bitcoin reaches new all-time high',
      url: '#',
      published_at: new Date().toISOString(),
      domain: 'cryptonews.com',
      votes: {
        positive: 150,
        negative: 10,
      },
    },
    {
      id: 2,
      title: 'Ethereum 2.0 update shows promising results',
      url: '#',
      published_at: new Date().toISOString(),
      domain: 'coindesk.com',
      votes: {
        positive: 120,
        negative: 5,
      },
    },
    {
      id: 3,
      title: 'Major crypto exchange announces new features',
      url: '#',
      published_at: new Date().toISOString(),
      domain: 'cointelegraph.com',
      votes: {
        positive: 80,
        negative: 15,
      },
    },
  ]
}
