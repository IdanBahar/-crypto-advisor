import { useState, useEffect } from 'react'
import { getCoinPrices } from '../utils/cryptoApi'

const CoinPrices = () => {
  const [coins, setCoins] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchCoins()
  }, [])

  const fetchCoins = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await getCoinPrices()
      setCoins(response.data)

      if (response.message) {
        console.info(response.message)
      }
    } catch (err) {
      setError('Failed to fetch coin prices')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price)
  }

  const formatChange = (change) => {
    const value = change?.toFixed(2)
    const isPositive = change > 0
    return {
      value,
      isPositive,
      className: isPositive ? 'positive' : 'negative',
    }
  }

  if (loading) {
    return (
      <div className="coin-prices-card">
        <h2 className="section-title">Coin Prices</h2>
        <div className="loading">Loading prices...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="coin-prices-card">
        <h2 className="section-title">💰 Coin Prices</h2>
        <div className="error">{error}</div>
        <button onClick={fetchCoins} className="retry-button">
          Retry
        </button>
      </div>
    )
  }

  return (
    <div className="coin-prices-card">
      <h2 className="section-title">💰 Coin Prices</h2>

      <div className="coins-grid">
        {Object.entries(coins).map(([coinId, data]) => {
          const change = formatChange(data.usd_24h_change)

          return (
            <div key={coinId} className="coin-item">
              <div className="coin-header">
                <h3 className="coin-name">
                  {coinId.charAt(0).toUpperCase() + coinId.slice(1)}
                </h3>
              </div>

              <div className="coin-price">{formatPrice(data.usd)}</div>

              <div className={`coin-change ${change.className}`}>
                {change.isPositive ? '▲' : '▼'} {Math.abs(change.value)}%
                <span className="change-label">24h</span>
              </div>

              {data.usd_market_cap && (
                <div className="coin-marketcap">
                  Cap: {formatPrice(data.usd_market_cap / 1000000000)}B
                </div>
              )}
            </div>
          )
        })}
      </div>

      <button onClick={fetchCoins} className="refresh-button">
        Refresh
      </button>
    </div>
  )
}

export default CoinPrices
