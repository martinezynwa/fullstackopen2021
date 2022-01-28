import React, { useState } from 'react'


/* const Statistics = (props) => {
  if (props.All === 0) {
    return (
      <div>
        <h1>Statistics</h1>
        <div>no feedback given</div>
      </div>
    )
  } */

const Statistics = ({ good, neutral, bad }) => {

    if (good === 0 && neutral === 0 && bad === 0) {
        return (
            <div>
                <h1>Statistics</h1>
                <div>no feedback given</div>
            </div>
        )
    }

    else {
        return (
            <div>
                <h1>Statistics</h1>
                <div>good {good}</div>
                <div>neutral {neutral}</div>
                <div>bad {bad}</div>
                <div>all {good + neutral + bad}</div>
                <div>Average: {(good - bad) / (good + neutral + bad)}</div>
                <div>Positive: {((good) / (good + neutral + bad)) * 100}%</div>
            </div>
        )
    }
}

const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    return (
        <div>
            <h1>Give feedback</h1>
            <button onClick={() => setGood(good + 1)}>good</button>
            <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
            <button onClick={() => setBad(bad + 1)}>bad</button>
            <Statistics good={good} neutral={neutral} bad={bad} />
        </div>
    )
}

export default App