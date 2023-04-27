import { createSlice } from "@reduxjs/toolkit"
import AnecdoteService from "../services/AnecdoteService"

const initialState = []

const anecdoteSlice = createSlice({
  name: "anecdote",
  initialState,
  reducers: {
    updateAnecdote(state, action) {
      const updatedAnecdote = action.payload
      return state.map(anecdote => anecdote.id === updatedAnecdote.id? updatedAnecdote : anecdote)
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { updateAnecdote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions
export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await AnecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}
export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await AnecdoteService.create(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}
export const incrementVote = (anecdote) => {
  return async dispatch => {
    const updatedAnecdote = await AnecdoteService.incrementVote(anecdote)
    dispatch(updateAnecdote(updatedAnecdote))
  }
}
export default anecdoteSlice.reducer