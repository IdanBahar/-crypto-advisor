import { useEffect, useState } from 'react'
import { fetchAiInsight } from '../utils/aiInsightApi.js'

function AiInsightCard() {
  const [insight, setInsight] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const loadInsight = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await fetchAiInsight()
      setInsight(data)
    } catch (err) {
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadInsight()
  }, [])

  if (loading) {
    return (
      <div className="card">
        <h2>AI Insight of the Day</h2>
        <p>Loading insight…</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="aiInsight-card-error card">
        <h2>AI Insight of the Day</h2>
        <p style={{ color: 'red' }}>Error: {error}</p>
        <button onClick={loadInsight}>Try again</button>
      </div>
    )
  }

  return (
    <div className="aiInsight-card card">
      <h2>AI Insight of the Day</h2>
      <p>{insight?.insight}</p>
      {insight?.generatedAt && (
        <small style={{ opacity: 0.7 }}>
          Generated at: {new Date(insight.generatedAt).toLocaleString()}
        </small>
      )}
    </div>
  )
}

export default AiInsightCard
