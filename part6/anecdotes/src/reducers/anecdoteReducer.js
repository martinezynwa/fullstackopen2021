import anecdoteService from '../services/anecdotes'

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'ALL_ANECDOTES':
      return action.data
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'VOTE':
      const updatedAnecdote = state.map(a =>
        a.id === action.data.id ? { ...a, votes: a.votes + 1 } : a,
      )
      return updatedAnecdote
    default:
      return state
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const response = await anecdoteService.getAll()

    dispatch({
      type: 'ALL_ANECDOTES',
      data: response,
    })
  }
}

export const initializeAddition = content => {
  return async dispatch => {
    const response = await anecdoteService.createNew(content)

    dispatch({
      type: 'NEW_ANECDOTE',
      data: response,
    })
  }
}

export const initializeUpdate = id => {
  return async (dispatch, getState) => {
    const updatedAnecdote = getState().anecdotes.find(a => a.id === id)
    const votedAnecdote = {
      ...updatedAnecdote,
      votes: updatedAnecdote.votes + 1,
    }
    const response = await anecdoteService.update(id, votedAnecdote)

    dispatch({
      type: 'VOTE',
      data: response,
    })
  }
}

export default reducer
