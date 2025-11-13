import { findUserById, updateUserPreferences } from '../models/User.js'

export const updatePreferences = async (req, res) => {
  try {
    const userId = req.userId
    const { interestedCoins, investorType, contentPreferences } = req.body

    if (!interestedCoins || !investorType || !contentPreferences) {
      return res.status(400).json({
        message: 'Please provide all preferences',
      })
    }

    const preferences = {
      interestedCoins,
      investorType,
      contentPreferences,
      completedAt: new Date(),
    }

    await updateUserPreferences(userId, preferences)

    res.json({
      message: 'Preferences saved successfully',
      preferences,
    })
  } catch (error) {
    console.error('Update preferences error:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

export const getUserProfile = async (req, res) => {
  try {
    const userId = req.userId
    const user = await findUserById(userId)

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    const { password, ...userWithoutPassword } = user

    res.json({
      user: userWithoutPassword,
    })
  } catch (error) {
    console.error('Get user profile error:', error)
    res.status(500).json({ message: 'Server error' })
  }
}
