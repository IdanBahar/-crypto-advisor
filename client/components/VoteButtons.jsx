import { useState } from 'react'
import {
  AiOutlineLike,
  AiFillLike,
  AiOutlineDislike,
  AiFillDislike,
} from 'react-icons/ai'

function VoteButtons({ section, color = 'white', size = 24 }) {
  const [userVote, setUserVote] = useState(0)

  const handleVote = async (voteValue) => {
    const newVote = userVote === voteValue ? 0 : voteValue

    try {
      const token = localStorage.getItem('token')

      const response = await fetch('http://localhost:3000/api/vote', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          section,
          vote: newVote,
        }),
      })

      if (response.ok) {
        setUserVote(newVote)
      } else {
        alert('Failed to save vote')
      }
    } catch (error) {
      console.error('Error saving vote:', error)
      alert('Error saving vote')
    }
  }

  return (
    <div
      className="like-container"
      style={{
        display: 'flex',
        flexDirection: 'row',
        gap: '16px',
        marginTop: '12px',
      }}
    >
      <div onClick={() => handleVote(1)} style={{ cursor: 'pointer' }}>
        {userVote === 1 ? (
          <AiFillLike color={color} size={size} />
        ) : (
          <AiOutlineLike color={color} size={size} />
        )}
      </div>

      <div onClick={() => handleVote(-1)} style={{ cursor: 'pointer' }}>
        {userVote === -1 ? (
          <AiFillDislike color={color} size={size} />
        ) : (
          <AiOutlineDislike color={color} size={size} />
        )}
      </div>
    </div>
  )
}

export default VoteButtons
