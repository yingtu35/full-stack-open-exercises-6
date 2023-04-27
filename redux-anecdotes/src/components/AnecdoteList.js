import { useSelector, useDispatch } from "react-redux"
import { incrementVote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <div>
      <div>
        {anecdote.content}
      </div>
      <div>
                has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = () => {
  const anecdotes = useSelector(state => {
    return (
      state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter))
        .sort((a, b) => b.votes - a.votes )
    )})
  const dispatch = useDispatch()
  const handleVote = (anecdote) => {
    dispatch(incrementVote(anecdote))
    dispatch(setNotification(`You voted '${anecdote.content}'`, 10))
  }

  return (
    <div>
      {anecdotes.map(anecdote =>
        <Anecdote key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => handleVote(anecdote)}
        />
      )}
    </div>
  )
}

export default AnecdoteList