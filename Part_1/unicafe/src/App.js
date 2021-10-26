import React, { useState } from "react"

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  const feedbackAmount = good + neutral + bad
  const feedbackAverage = (good - bad) / feedbackAmount
  const positivePercentage = (good / feedbackAmount) * 100 + "%"

  if (feedbackAmount === 0) {
    return (
      <p>No feedback given</p>
    )
  }

  return (
    <div>
      <table>
        <tbody>
          <StatisticLine text="Good" value={good} />
          <StatisticLine text="Neutral" value={neutral} />
          <StatisticLine text="Bad" value={bad} />
          <StatisticLine text="All" value={feedbackAmount} />
          <StatisticLine text="Average" value={feedbackAverage} />
          <StatisticLine text="Positive" value={positivePercentage} />
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => setGood(good + 1)
  const handleNeutralClick = () => setNeutral(neutral + 1)
  const handleBadClick = () => setBad(bad + 1)

  return (
    <div>
      <h1>Give feedback</h1>
      <Button
        handleClick={handleGoodClick}
        text="Good"
      />
      <Button
        handleClick={handleNeutralClick}
        text="Neutral"
      />
      <Button
        handleClick={handleBadClick}
        text="Bad"
      />
      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App;
