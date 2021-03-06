import { useState } from 'react'

export const useField = type => {
  const [value, setValue] = useState('')

  const onChange = event => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue('')
  }

  const fieldProperties = {
    type,
    value,
    onChange,
  }

  return {
    fieldProperties,
    reset,
  }
}

export default useField
