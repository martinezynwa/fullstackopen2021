import userService from '../services/users'

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'ALL_USERS':
      return action.data
    default:
      return state
  }
}

export const initializeUsers = () => {
  return async dispatch => {
    const response = await userService.getAllUsers()

    dispatch({
      type: 'ALL_USERS',
      data: response,
    })
  }
}

export default reducer
