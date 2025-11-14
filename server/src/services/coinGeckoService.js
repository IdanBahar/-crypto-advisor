import axios from 'axios'

const COINGECKO_API = 'https://api.coingecko.com/api/v3'

const FALLBACK_PRICES = {
  bitcoin: {
    usd: 65000,
    usd_24h_change: 1.2,
    usd_market_cap: 1200000000000,
  },
  ethereum: {
    usd: 3200,
    usd_24h_change: -0.5,
    usd_market_cap: 380000000000,
  },
  cardano: {
    usd: 0.45,
    usd_24h_change: 0.8,
    usd_market_cap: 16000000000,
  },
}

export const getCoinPrices = async (
  coinIds = ['bitcoin', 'ethereum', 'cardano']
) => {
  try {
    const response = await axios.get(`${COINGECKO_API}/simple/price`, {
      params: {
        ids: coinIds.join(','),
        vs_currencies: 'usd',
        include_24hr_change: true,
        include_market_cap: true,
      },
    })

    return response.data
  } catch (error) {
    console.error('CoinGecko API Error:', error.message)

    console.warn('Using FALLBACK_PRICES due to CoinGecko error')

    const result = {}
    coinIds.forEach((id) => {
      if (FALLBACK_PRICES[id]) {
        result[id] = FALLBACK_PRICES[id]
      }
    })

    return result
  }
}

export const getCoinDetails = async (coinId) => {
  try {
    const response = await axios.get(`${COINGECKO_API}/coins/${coinId}`, {
      params: {
        localization: false,
        tickers: false,
        community_data: false,
        developer_data: false,
      },
    })

    return response.data
  } catch (error) {
    console.error('CoinGecko API Error:', error.message)

    throw new Error('Failed to fetch coin details')
  }
}
