import { useState } from 'react'
import {
  AiOutlineLike,
  AiFillLike,
  AiOutlineDislike,
  AiFillDislike,
} from 'react-icons/ai'
import api from '../utils/api'

function VoteButtons({ section, color = 'white', size = 24 }) {
  const [userVote, setUserVote] = useState(0)

  const handleVote = async (voteValue) => {
    const newVote = userVote === voteValue ? 0 : voteValue

    try {
      const response = await api.put('/vote', {
        section,
        vote: newVote,
      })

      if (response.status === 200) {
        setUserVote(newVote)
        alert('Vote saved successfully!')
      }
    } catch (error) {
      alert(
        `Failed to save vote: ${error.response?.data?.message || error.message}`
      )
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
