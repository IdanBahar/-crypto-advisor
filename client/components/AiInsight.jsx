import { useEffect, useState } from 'react'
import { fetchAiInsight } from '../utils/aiInsightApi.js'
import { ClipLoader } from 'react-spinners'
import VoteButtons from './VoteButtons.jsx'
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
      <div className="aiInsight-card card">
        <h2>AI Insight of the Day</h2>
        <ClipLoader color=" #a78bfa" size={50} />
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
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBlock: '10px',
          width: '100%',
        }}
      >
        <h2 className="section-title">AI Insight of the Day</h2>
        <VoteButtons section="aiInsight" />
      </div>
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
