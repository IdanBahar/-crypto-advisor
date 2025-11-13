import jwt from 'jsonwebtoken'
import User from '../models/User.js'

// JWT Token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' })
}

// Register
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body

    // check require field
    if (!name || !email || !password) {
      return res.status(400).json({
        message: 'Please provide name, email and password',
      })
    }

    // if already exist
    const existingUser = await User.findByEmail(email)
    if (existingUser) {
      return res.status(400).json({
        message: 'User already exists with this email',
      })
    }

    // create new user
    const user = await User.create({ name, email, password })

    // create token
    const token = generateToken(user._id)

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    })
  } catch (error) {
    console.error('Register error:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

// login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({
        message: 'Please provide email and password',
      })
    }

    // searching user
    const user = await User.findByEmail(email)
    if (!user) {
      return res.status(401).json({
        message: 'Invalid email or password',
      })
    }

    // check pass
    const isPasswordValid = await User.comparePassword(password, user.password)
    if (!isPasswordValid) {
      return res.status(401).json({
        message: 'Invalid email or password',
      })
    }

    // token
    const token = generateToken(user._id)

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        hasCompletedOnboarding: !!user.preferences,
      },
    })
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({ message: 'Server error' })
  }
}
