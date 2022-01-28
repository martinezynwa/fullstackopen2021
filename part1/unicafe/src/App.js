import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = props => {
  return <button onClick={props.onClick}>{props.text}</button>;
};

const Statistic = ({ text, value, unit }) => {
  return (
    <>
      <tr>
        <td>{text}</td>
        <td>
          {value} {unit}
        </td>
      </tr>
    </>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  const sumAll = good + bad + neutral;
  const sumGoodBad = good + bad;
  const average = Math.round(((good - bad) / sumGoodBad) * 100) / 100;
  const positive = Math.round((good / sumGoodBad) * 100);

  if (sumAll === 0) {
    return (
      <div>
        <h2>statistics</h2>
        <p>No feedback given</p>
      </div>
    );
  }

  return (
    <>
      <h2>statistics</h2>
      <table>
        <tbody>
          <Statistic text="good" value={good} />
          <Statistic text="neutral" value={neutral} />
          <Statistic text="bad" value={bad} />
          <Statistic text="all" value={sumAll} />
          <Statistic text="average" value={average} />
          <Statistic text="positive" value={positive} unit="%" />
        </tbody>
      </table>
    </>
  );
};

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h2>give feedback</h2>
      <Button onClick={() => setGood(good + 1)} text="Good" />
      <Button onClick={() => setNeutral(neutral + 1)} text="Neutral" />
      <Button onClick={() => setBad(bad + 1)} text="Bad" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));