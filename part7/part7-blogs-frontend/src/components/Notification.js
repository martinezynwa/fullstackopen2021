import React from 'react'
import { useSelector } from 'react-redux'

/* const Notification = ({ message, type }) => {
  if (message === null) {
    return null
  }
  if (type === 'success') {
    return <div className="success">{message}</div>
  }
  if (type === 'error') {
    return <div className="error">{message}</div>
  }
} */

const Notification = () => {
  const notification = useSelector(state => state.notification)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  }

  if (!notification) return null

  return <div style={style}>{notification}</div>
}

export default Notification
