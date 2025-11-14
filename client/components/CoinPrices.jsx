import { useState, useEffect } from 'react'
import { getCoinPrices } from '../utils/cryptoApi'
import { ClipLoader } from 'react-spinners'

import VoteButtons from './VoteButtons'

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
      <div
        className="coin-prices-card"
        style={{ textAlign: 'center', padding: '40px' }}
      >
        <h2 className="section-title">Coin Prices</h2>
        <ClipLoader color="#60a5fa" size={50} />
      </div>
    )
  }

  if (error) {
    return (
      <div className="coin-prices-card">
        <h2 className="section-title">Coin Prices</h2>
        <div className="error">{error}</div>
        <button onClick={fetchCoins} className="retry-button">
          Retry
        </button>
      </div>
    )
  }

  return (
    <div className="coin-prices-card">
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBlock: '10px',
        }}
      >
        <h2 className="section-title">Coin Prices</h2>
        <VoteButtons section="coinPrices" />
      </div>

      <div className="coins-list">
        {Object.entries(coins).map(([coinId, data]) => {
          const change = formatChange(data.usd_24h_change)

          return (
            <div key={coinId} className={`coin-item ${change.className}`}>
              <div className="coin-header">
                <h3 className="coin-name">
                  {coinId.charAt(0).toUpperCase() + coinId.slice(1)}
                </h3>
                <div className="coin-price">{formatPrice(data.usd)}</div>
              </div>

              <div className="coin-footer">
                <div className="coin-change-wrapper">
                  <span className={`coin-change ${change.className}`}>
                    {change.isPositive ? '▲' : '▼'} {Math.abs(change.value)}%
                  </span>
                  <span className="change-label">24h</span>
                </div>

                {data.usd_market_cap && (
                  <div className="coin-marketcap">
                    Cap: {formatPrice(data.usd_market_cap / 1000000000)}B
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      <button onClick={fetchCoins} className="refresh-button">
        Update Coins
      </button>
    </div>
  )
}

export default CoinPrices
