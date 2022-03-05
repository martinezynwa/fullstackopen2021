import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import AddBook from './components/AddBook'

const App = () => {
  const [page, setPage] = useState('authors')

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Authors show={page === 'authors'} />
      <Books show={page === 'books'} />
      <AddBook show={page === 'add'} />
    </div>
  )
}

export default App
