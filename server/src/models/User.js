import { getDB } from '../config/db.js'
import bcrypt from 'bcryptjs'

export const createUser = async (userData) => {
  const db = getDB()
  const { name, email, password } = userData

  const hashedPassword = await bcrypt.hash(password, 10)

  const user = {
    name,
    email: email.toLowerCase(),
    password: hashedPassword,
    createdAt: new Date(),
    preferences: null,
  }

  const result = await db.collection('users').insertOne(user)
  return { _id: result.insertedId, ...user }
}

export const findUserByEmail = async (email) => {
  const db = getDB()
  return await db.collection('users').findOne({ email: email.toLowerCase() })
}

export const findUserById = async (id) => {
  const db = getDB()
  const { ObjectId } = await import('mongodb')
  return await db.collection('users').findOne({ _id: new ObjectId(id) })
}

export const comparePassword = async (plainPassword, hashedPassword) => {
  return await bcrypt.compare(plainPassword, hashedPassword)
}

export const updateUserPreferences = async (userId, preferences) => {
  const db = getDB()
  const { ObjectId } = await import('mongodb')

  const result = await db.collection('users').updateOne(
    { _id: new ObjectId(userId) },
    {
      $set: {
        preferences,
        updatedAt: new Date(),
      },
    }
  )

  return result
}
