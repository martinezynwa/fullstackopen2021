import Anecdotes from './components/Anecdotes'
import NewAnecdote from './components/NewAnecdote'

const App = () => {
  return (
    <div>
      <NewAnecdote />
      <Anecdotes />
    </div>
  )
}

/*  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const vote = (id) => {
    console.log('vote', id)
  }


}*/

export default App
