import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../utils/api'
import { useEffect } from 'react'

function Onboarding() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')

    if (!token || !userData) {
      navigate('/login')
      return
    }
  }, [navigate])
  const [formData, setFormData] = useState({
    interestedCoins: [],
    investorType: '',
    contentPreferences: [],
  })

  const coins = [
    'Bitcoin',
    'Ethereum',
    'Solana',
    'Cardano',
    'Polkadot',
    'Avalanche',
  ]
  const investorTypes = [
    'HODLer',
    'Day Trader',
    'Swing Trader',
    'NFT Collector',
  ]
  const contentTypes = [
    'Market News',
    'Price Charts',
    'Social Trends',
    'Fun Memes',
  ]

  const handleCoinToggle = (coin) => {
    setFormData((prev) => ({
      ...prev,
      interestedCoins: prev.interestedCoins.includes(coin)
        ? prev.interestedCoins.filter((c) => c !== coin)
        : [...prev.interestedCoins, coin],
    }))
  }

  const handleContentToggle = (content) => {
    setFormData((prev) => ({
      ...prev,
      contentPreferences: prev.contentPreferences.includes(content)
        ? prev.contentPreferences.filter((c) => c !== content)
        : [...prev.contentPreferences, content],
    }))
  }

  const handleNext = () => {
    if (step === 1 && formData.interestedCoins.length === 0) {
      setError('Please select at least one coin')
      return
    }
    if (step === 2 && !formData.investorType) {
      setError('Please select an investor type')
      return
    }
    setError('')
    setStep(step + 1)
  }

  const handleBack = () => {
    setError('')
    setStep(step - 1)
  }

  const handleSubmit = async () => {
    if (formData.contentPreferences.length === 0) {
      setError('Please select at least one content type')
      return
    }

    setLoading(true)
    setError('')

    try {
      await api.put('/user/preferences', formData)

      const userData = JSON.parse(localStorage.getItem('user'))
      userData.hasCompletedOnboarding = true
      localStorage.setItem('user', JSON.stringify(userData))

      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save preferences')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="onboarding-container">
      <div className="onboarding-card">
        <div className="progress-bar">
          <div className="progress-step">
            <div className={`step-circle ${step >= 1 ? 'active' : ''}`}>1</div>
            <span className="step-label">Coins</span>
          </div>
          <div className={`progress-line ${step >= 2 ? 'active' : ''}`}></div>
          <div className="progress-step">
            <div className={`step-circle ${step >= 2 ? 'active' : ''}`}>2</div>
            <span className="step-label">Type</span>
          </div>
          <div className={`progress-line ${step >= 3 ? 'active' : ''}`}></div>
          <div className="progress-step">
            <div className={`step-circle ${step >= 3 ? 'active' : ''}`}>3</div>
            <span className="step-label">Content</span>
          </div>
        </div>

        {step === 1 && (
          <div className="onboarding-step">
            <h2>What crypto assets interest you?</h2>
            <p className="step-description">
              Select the coins you want to track
            </p>

            <div className="options-grid">
              {coins.map((coin) => (
                <button
                  key={coin}
                  type="button"
                  className={`option-card ${
                    formData.interestedCoins.includes(coin) ? 'selected' : ''
                  }`}
                  onClick={() => handleCoinToggle(coin)}
                >
                  {coin}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="onboarding-step">
            <h2>What type of investor are you?</h2>
            <p className="step-description">Choose your investing style</p>

            <div className="options-list">
              {investorTypes.map((type) => (
                <button
                  key={type}
                  type="button"
                  className={`option-card ${
                    formData.investorType === type ? 'selected' : ''
                  }`}
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, investorType: type }))
                  }
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="onboarding-step">
            <h2>What content would you like to see?</h2>
            <p className="step-description">Customize your dashboard</p>

            <div className="options-list">
              {contentTypes.map((content) => (
                <button
                  key={content}
                  type="button"
                  className={`option-card ${
                    formData.contentPreferences.includes(content)
                      ? 'selected'
                      : ''
                  }`}
                  onClick={() => handleContentToggle(content)}
                >
                  {content}
                </button>
              ))}
            </div>
          </div>
        )}

        {error && <div className="error-message">{error}</div>}

        <div className="onboarding-actions">
          {step > 1 && (
            <button onClick={handleBack} className="btn-secondary">
              Back
            </button>
          )}
          {step < 3 ? (
            <button onClick={handleNext} className="btn-primary">
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="btn-primary"
            >
              {loading ? 'Saving...' : 'Complete Setup'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Onboarding
