import { useState, useEffect } from 'react'
import { getMarketNews } from '../utils/newsApi'
import { ClipLoader } from 'react-spinners'

import VoteButtons from './VoteButtons'

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

  if (loading) {
    return (
      <div
        className="market-news-card"
        style={{ textAlign: 'center', padding: '40px' }}
      >
        <h2 className="section-title">Market News</h2>
        <ClipLoader color="#60a5fa" size={50} />
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
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBlock: '10px',
        }}
      >
        <h2 className="section-title">Market News</h2>
        <VoteButtons section="marketNews" />
      </div>

      <div className="news-list">
        {Array.isArray(news) && news.length > 0 ? (
          news.map((article) => {
            return (
              <a
                key={article.id}
                href={article.url || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className={`news-item `}
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
