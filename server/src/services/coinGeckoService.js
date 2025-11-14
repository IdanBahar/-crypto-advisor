import axios from 'axios'

const COINGECKO_API = 'https://api.coingecko.com/api/v3'

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
    throw new Error('Failed to fetch coin prices')
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
