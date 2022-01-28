import React, { useState } from 'react'

const Statistics = ({ good, neutral, bad }) => {
    return (
        <div>
            <p>{console.log(good, neutral, bad)}</p>
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

/* const Statistics = (props) => {
  return (
    <div>
      <p>{console.log(props.good, props.neutral, props.bad)}</p>
      <h1>Statistics</h1>
      <div>good {props.good}</div>
      <div>neutral {props.neutral}</div>
      <div>bad {props.bad}</div>
      <div>all {props.good + props.neutral + props.bad}</div>
      <div>Average: {(props.good - props.bad) / (props.good + props.neutral + props.bad)}</div>
      <div>Positive: {((props.good) / (props.good + props.neutral + props.bad))*100}%</div>
    </div>
  )
} */

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