const reducer = (state = [], action) => {
  switch (action.type) {
    case 'ALL_ANECDOTES':
      return action.data
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'VOTE':
      return state.map(s =>
        s.id === action.data ? { ...s, votes: s.votes + 1 } : s,
      )
    default:
      return state
  }
}

export const createAnecdote = content => ({
  type: 'NEW_ANECDOTE',
  data: content,
})

export const voteFor = id => ({
  type: 'VOTE',
  data: id,
})

export const setAnecdotes = content => ({
  type: 'ALL_ANECDOTES',
  data: content,
})

export default reducer
