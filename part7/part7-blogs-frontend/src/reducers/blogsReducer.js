import blogService from '../services/blogs'
import { setNotificationMessage } from '../reducers/notificationReducer'

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'ALL_BLOGS':
      return action.data
    case 'NEW_BLOG':
      return [...state, action.data]
    case 'UPDATE_BLOG': {
      const updatedBlog = state.map(b =>
        b.id === action.data.id ? { ...b, likes: b.likes + 1 } : b,
      )
      return updatedBlog
    }
    case 'DELETE_BLOG': {
      const deletedBlog = state.filter(b => b.id !== action.data.id)
      return deletedBlog
    }
    default:
      return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const response = await blogService.getAll()

    dispatch({
      type: 'ALL_BLOGS',
      data: response,
    })
  }
}

export const initializeAddition = content => {
  return async dispatch => {
    try {
      const response = await blogService.create(content)

      dispatch({
        type: 'NEW_BLOG',
        data: response,
      })
    } catch (exception) {
      dispatch(setNotificationMessage(`${exception}`, 5000))
    }
  }
}

export const initializeUpdate = blog => {
  return async dispatch => {
    try {
      const updatedData = {
        data: {
          likes: blog.likes + 1,
        },
        id: blog.id,
      }
      const updatedBlog = await blogService.update(updatedData)
      dispatch({
        type: 'UPDATE_BLOG',
        data: updatedBlog,
      })
      dispatch(
        setNotificationMessage(
          `Blog ${updatedBlog.title} likes increased`,
          5000,
        ),
      )
    } catch (exception) {
      dispatch(setNotificationMessage(`${exception}`, 5000))
    }
  }
}

export const initializeDeletion = blog => {
  return async dispatch => {
    try {
      const deletedData = {
        id: blog.id,
      }
      await blogService.remove(deletedData)
      dispatch({
        type: 'DELETE_BLOG',
        data: deletedData,
      })
      dispatch(setNotificationMessage(`Blog ${blog.title} deleted`, 5000))
    } catch (exception) {
      dispatch(setNotificationMessage(`${exception}`, 5000))
    }
  }
}

export default reducer
