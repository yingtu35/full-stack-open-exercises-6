import axios from "axios"

const baseUrl = "http://localhost:3001/anecdotes"

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (content) => {
  const newNote = {
    content,
    votes: 0
  }
  const response = await axios.post(baseUrl, newNote)
  return response.data
}

const incrementVote = async (anecdote) => {
  const id = anecdote.id
  const updateAnecdote = {
    ...anecdote,
    votes: anecdote.votes + 1
  }
  const response = await axios.put(`${baseUrl}/${id}`, updateAnecdote)
  return response.data
}

export default {
  getAll, create, incrementVote
}