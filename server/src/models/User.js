import { getDB } from '../config/db.js'
import bcrypt from 'bcryptjs'

class User {
  static async create(userData) {
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

  static async findByEmail(email) {
    const db = getDB()
    return await db.collection('users').findOne({ email: email.toLowerCase() })
  }

  static async findById(id) {
    const db = getDB()
    const { ObjectId } = await import('mongodb')
    return await db.collection('users').findOne({ _id: new ObjectId(id) })
  }

  static async comparePassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword)
  }
}

export default User
