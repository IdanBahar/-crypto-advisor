import { getCoinPrices } from '../services/coinGeckoService.js'
import { findUserById } from '../models/User.js'

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
