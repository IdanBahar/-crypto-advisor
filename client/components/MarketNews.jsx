import { useState, useEffect } from 'react'
import { getMarketNews } from '../utils/newsApi'

const MarketNews = () => {
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchNews()
  }, [])

  const fetchNews = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await getMarketNews()
      console.log('Fetched news data:', data)
      setNews(Array.isArray(data) ? data : [])
    } catch (err) {
      setError('Failed to fetch news')
      console.error('Fetch news error:', err)
      setNews([])
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now - date
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMins / 60)
    const diffDays = Math.floor(diffHours / 24)

    if (diffMins < 60) {
      return `${diffMins}m ago`
    } else if (diffHours < 24) {
      return `${diffHours}h ago`
    } else {
      return `${diffDays}d ago`
    }
  }

  const getSentiment = (votes) => {
    if (!votes) return 'neutral'
    const total = votes.positive + votes.negative
    if (total === 0) return 'neutral'

    const positivePercent = (votes.positive / total) * 100

    if (positivePercent >= 70) return 'bullish'
    if (positivePercent <= 30) return 'bearish'
    return 'neutral'
  }

  if (loading) {
    return (
      <div className="market-news-card">
        <h2 className="section-title">Market News</h2>
        <div className="loading">Loading news...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="market-news-card">
        <h2 className="section-title">Market News</h2>
        <div className="error">{error}</div>
        <button onClick={fetchNews} className="retry-button">
          Retry
        </button>
      </div>
    )
  }

  return (
    <div className="market-news-card">
      <h2 className="section-title">Market News</h2>

      <div className="news-list">
        {Array.isArray(news) && news.length > 0 ? (
          news.map((article) => {
            const sentiment = getSentiment(article.votes)

            return (
              <a
                key={article.id}
                href={article.url || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className={`news-item ${sentiment}`}
              >
                <div className="news-header">
                  <span className="news-domain">
                    {article.domain || 'crypto news'}
                  </span>
                  <span className="news-time">
                    {formatDate(article.published_at)}
                  </span>
                </div>

                <h3 className="news-title">{article.title}</h3>

                {article.votes && (
                  <div className="news-footer">
                    <div className="votes">
                      <span className="vote-positive">
                        👍 {article.votes.positive}
                      </span>
                      <span className="vote-negative">
                        👎 {article.votes.negative}
                      </span>
                    </div>
                    <span className={`sentiment-badge ${sentiment}`}>
                      {sentiment === 'bullish' && '🚀 Bullish'}
                      {sentiment === 'bearish' && '📉 Bearish'}
                      {sentiment === 'neutral' && '➡️ Neutral'}
                    </span>
                  </div>
                )}
              </a>
            )
          })
        ) : (
          <div className="no-news">
            {Array.isArray(news) ? 'No news available' : 'Loading news...'}
          </div>
        )}
      </div>

      <button onClick={fetchNews} className="refresh-button">
        Update News
      </button>
    </div>
  )
}

export default MarketNews
