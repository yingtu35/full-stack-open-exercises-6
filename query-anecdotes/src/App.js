import { useNotificationDispatch } from "./NotificationContext"
import { useQuery, useMutation, useQueryClient } from "react-query"
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAnecdotes, voteAnecdote } from "./requests"

const App = () => {
  const notificationDispatch = useNotificationDispatch()
  const queryClient = useQueryClient()
  const result = useQuery(
    "anecdotes",
    getAnecdotes,
    {
      retry: 1,
      refetchOnWindowFocus: false
    }
  )
  const voteMutation = useMutation(
    voteAnecdote,
    {
      onSuccess: (votedAnecdote) => {
        const anecdotes = queryClient.getQueryData("anecdotes")
        queryClient.setQueryData("anecdotes", anecdotes.map(anecdote => anecdote.id === votedAnecdote.id ? votedAnecdote : anecdote))
        notificationDispatch({
          type: "SUCCESS",
          payload: `anecdote '${votedAnecdote.content}' voted`
        })
        setTimeout(() => {
          notificationDispatch({
            type: "RESET"
          })
        }, 5000)
      },
      onError: (error) => {
        const errMessage = error.response.data.error
        notificationDispatch({
          type: "ERROR",
          payload: errMessage
        })
        setTimeout(() => {
          notificationDispatch({
            type: "RESET"
          })
        }, 5000)
      }
    }
  )

  
  if (result.isLoading) {
    return <div>Loading data</div>
  }

  if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>
  }

  const handleVote = (anecdote) => {
    voteMutation.mutate({
      ...anecdote,
      votes: 1 + anecdote.votes
    })
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
