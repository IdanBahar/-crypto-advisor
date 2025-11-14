import { useState, useEffect } from 'react'
import { ClipLoader } from 'react-spinners'
import VoteButtons from './VoteButtons'

function FunFacts() {
  const [loading, setLoading] = useState(true)
  const [currentFact, setCurrentFact] = useState(null)
  const [userVote, setUserVote] = useState(0)

  useEffect(() => {
    const url =
      'https://corsproxy.io/?' +
      encodeURIComponent(
        'https://www.reddit.com/r/todayilearned/hot.json?limit=50'
      )

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const facts = data.data.children.map((post) => ({
          title: post.data.title.replace(/TIL:? /g, ''),
          score: post.data.ups,
          id: post.data.id,
        }))

        const random = facts[Math.floor(Math.random() * facts.length)]
        setCurrentFact(random)
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <ClipLoader color="#60a5fa" size={50} />
        <p>Loading Fun Facts...</p>
      </div>
    )
  }

  return (
    <div className="fun-facts-card">
      <div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBlock: '10px',
          }}
        >
          <h2 className="section-title">Did you know?</h2>
          <VoteButtons section="funFacts" />
        </div>
      </div>
      <p>{currentFact?.title}</p>
      <small>👍 {currentFact?.score} upvotes on Reddit</small>

      <div
        className="like-container"
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '16px',
          marginTop: '12px',
        }}
      ></div>
    </div>
  )
}

export default FunFacts
