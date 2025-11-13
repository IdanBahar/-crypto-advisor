import { MongoClient } from 'mongodb'

let db

const connectDB = async () => {
  try {
    const client = new MongoClient(process.env.MONGODB_URI)
    await client.connect()

    db = client.db()

    console.log('MongoDB Connected')
    console.log(`Database: ${db.databaseName}`)

    return db
  } catch (error) {
    console.error('MongoDB Error:', error.message)
    process.exit(1)
  }
}

const getDB = () => {
  if (!db) {
    throw new Error('Database not initialized. Call connectDB first.')
  }
  return db
}

export { connectDB, getDB }
