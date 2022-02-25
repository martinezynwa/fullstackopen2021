const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.data ? action.data.notification : null
    default:
      return state
  }
}

export const setNotificationMessage = (notification, timer) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: { notification },
    })
    setTimeout(
      () =>
        dispatch({
          type: 'SET_NOTIFICATION',
          data: '',
        }),
      timer,
    )
  }
}
export default notificationReducer
