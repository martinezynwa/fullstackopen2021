import React, { useState } from 'react'

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  /*   const clickGood = () => {
      setGood(good + 1)
    }
  
    const clickNeutral = () => {
      setNeutral(neutral + 1)
    }
  
    const clickBad = () => {
      setBad(bad + 1)
  
    } */


  return (
    <div>
      <h1>Give feedback</h1>
      <button onClick={() => setGood(good + 1)}>good</button>
      <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
      <button onClick={() => setBad(bad + 1)}>bad</button>
      {/*   <Button handleClick={clickGood} text="good"/>
      <Button handleClick={clickNeutral} text="neutral"/>
      <Button handleClick={clickBad} text="bad"/> */}
      <h1>Statistics</h1>
      <div>good {good}</div>
      <div>neutral {neutral}</div>
      <div>bad {bad}</div>
    </div>
  )
};

/* const Button = ({ handleClick, text }) => {
  return (<button onClick={handleClick}>{text}</button>);
} */


export default App