import { getCoinPrices } from '../services/coinGeckoService.js'
import { findUserById } from '../models/User.js'
import { getNews } from '../services/cryptoPanicService.js'

export const getCoins = async (req, res) => {
  try {
    const userId = req.userId

    const user = await findUserById(userId)

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      })
    }

    if (!user.preferences || !user.preferences.interestedCoins) {
      const defaultCoins = ['bitcoin', 'ethereum', 'cardano']
      const prices = await getCoinPrices(defaultCoins)

      return res.json({
        success: true,
        data: prices,
        message: 'Using default coins - complete onboarding to customize',
      })
    }

    const userCoins = user.preferences.interestedCoins.map((coin) =>
      coin.toLowerCase()
    )

    const prices = await getCoinPrices(userCoins)

    res.json({
      success: true,
      data: prices,
    })
  } catch (error) {
    console.error('Get coins error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch coin prices',
    })
  }
}

export const getMarketNews = async (req, res) => {
  try {
    const userId = req.userId

    const user = await findUserById(userId)

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      })
    }

    let currencies = null
    if (user.preferences && user.preferences.interestedCoins) {
      currencies = user.preferences.interestedCoins.map((coin) => {
        const coinMap = {
          bitcoin: 'BTC',
          ethereum: 'ETH',
          cardano: 'ADA',
          solana: 'SOL',
          polkadot: 'DOT',
          avalanche: 'AVAX',
        }
        return coinMap[coin.toLowerCase()] || coin.toUpperCase().slice(0, 3)
      })
    }

    const news = await getNews('rising', currencies)

    res.json({
      success: true,
      data: news.slice(0, 10),
    })
  } catch (error) {
    console.error('Get market news error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch market news',
    })
  }
}
