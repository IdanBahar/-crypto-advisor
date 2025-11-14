import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Greeting from '../components/Greeting'
import CoinPrices from '../components/CoinPrices'
import MarketNews from '../components/MarketNews'
import AiInsightCard from '../components/AiInsight'
import FunFacts from '../components/FunFacts'
function Dashboard() {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')

    if (!token || !userData) {
      navigate('/login')
      return
    }

    setUser(JSON.parse(userData))
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
  }

  if (!user) return <div>Loading...</div>

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>
          <Greeting name={user.name} />
        </h1>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>

      <div className="dashboard-content">
        <CoinPrices />
        <MarketNews />
        <AiInsightCard />
        <FunFacts />
      </div>
    </div>
  )
}

export default Dashboard
