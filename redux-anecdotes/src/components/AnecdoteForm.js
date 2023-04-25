import { useDispatch } from 'react-redux'
import { createAnecdote } from "../reducers/anecdoteReducer"
import { setMessage, clearMessage } from '../reducers/notificationReducer'


const AnecdoteForm = () => {
    const dispatch = useDispatch()
    const addNote = (e) => {
        e.preventDefault()
        const content = e.target.anecdote.value
        e.target.anecdote.value = ""
        dispatch(createAnecdote(content))
        dispatch(setMessage(`You added '${content}'`))
        setTimeout(() => {
            dispatch(clearMessage())
        }, 5000)
    }
    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addNote}>
                <div><input name="anecdote" /></div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm