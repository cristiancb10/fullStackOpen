import { useState } from "react"

const Title = (props) => <h1>{props.title}</h1>

const SubTitle = (props) => <h2>{props.subTitle}</h2>

const Button = (props) => <button onClick={props.handleClick}>{props.text}</button>

const StatisticLine = (props) => (
  <tr>
    <td>{props.text}</td>
    <td>{props.value} {props.simb}</td> 
  </tr>
)

const Statistics = (props) => {
  const average = (props.good - props.bad) / props.total
  const positive = (props.good / props.total) * 100
  
  if(props.total === 0){
    return (
      <p>No feedback given</p>
    )
  }
  return (
    <table>
      <tbody >
        <StatisticLine text='good' value={props.good}/>
        <StatisticLine text='neutral' value={props.neutral}/>
        <StatisticLine text='bad' value={props.bad}/>
        <StatisticLine text='all' value={props.total}/>
        <StatisticLine text='average' value={average}/>
        <StatisticLine text='positive' value={positive} simb='%'/>
      </tbody>
    </table> 
  )
}

const App = () => {
  const [ good, setGood ] = useState(0)
  const [ neutral, setNeutral ] = useState(0)
  const [ bad, setBad] = useState(0)

  const title = 'give feedback'
  const subTitle = 'statistics'

  const textGood = 'good'
  const textNeutral = 'neutral'
  const textBad = 'bad'

  const total = good + neutral + bad

  return (
    <div>
      <Title title={title}/>
      <Button handleClick={() => setGood(good + 1)} text={textGood}/>
      <Button handleClick={() => setNeutral(neutral + 1)} text={textNeutral}/>
      <Button handleClick={() => setBad(bad + 1)} text={textBad}/>
      <SubTitle subTitle={subTitle}/>
      <Statistics good={good} neutral={neutral} bad={bad} total={total}/>
    </div>
  )
}

export default App