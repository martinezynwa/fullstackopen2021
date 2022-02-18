import React from 'react'
import { useDispatch } from 'react-redux'
import { filterChange } from '../reducers/filterReducer'

const Filter = () => {
  const dispatch = useDispatch()

  const handleChange = e => {
    const filter = e.target.value
    dispatch(filterChange(filter))
  }

  const style = {
    marginBottom: 10,
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      <div style={style}>
        filter <input onChange={handleChange} />
      </div>
    </div>
  )
}

export default Filter
