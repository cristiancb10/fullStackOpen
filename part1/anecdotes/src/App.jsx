import { useState } from "react"

const Title = (props) => <h2>{props.title}</h2>

const Button = (props) => <button onClick={props.handleClick}>next anecdote</button>

const Points = (props) => <button onClick={props.handleClick}>vote</button>

const SubTitle = (props) => <h2>{props.subTitle}</h2>

const MostVotes = (props) => (
  <div>
    <p>{props.maxAnecdote}</p>
    has {props.maxValue} votes
  </div>
)

const App = () => {
  const anecdotes = [
    'If hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers weite code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [ selected, setSelected ] = useState(0)
  const [ votes, setVotes ] = useState(Array(anecdotes.length).fill(0))
  const title = 'Anecdote of the day'
  const subTitle = 'Anecdote with most votes'

  const handleClick = () => {
    const randomClick = Math.floor(Math.random() * anecdotes.length)
    let next = 0
    if(selected === randomClick){
      next = (randomClick + 1) % anecdotes.length
      setSelected(next)
    }
    else {
      setSelected(randomClick)
    }
  }

  const counter = () => {
    const copy = [...votes]
    const value = selected
    copy[value] += 1
    setVotes(copy)
  }

  const most = () =>{
      const maxValue = Math.max(...votes)
      return votes.indexOf(maxValue)
  }

  const mostValue = most()

  return (
    <div>
      <Title title={title} />
      {anecdotes[selected]}<br/>
      has {votes[selected]} votes<br/>
      <Points handleClick={counter}/>
      <Button handleClick={handleClick}/>
      <SubTitle subTitle={subTitle}/>
      <MostVotes maxAnecdote={anecdotes[mostValue]} maxValue={votes[mostValue]}/>
    </div>
  )
}

export default App