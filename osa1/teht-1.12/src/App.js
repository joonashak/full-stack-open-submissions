import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      selected: 0,
      randomize: () => this.setState({ selected: Math.floor(Math.random() * ANECDOTES.length) }),
      votes: { },
      vote: (i) => () => {
        const votes = this.state.votes
        votes[i] = votes[i] ? votes[i] + 1 : 1
        this.setState({ votes: votes })
      },
      best: () => {
        const values = Object.values(this.state.votes)
        const maxValue = Math.max(...values)
        const index = values.findIndex(x => x === maxValue)
        const anecdoteNo = Object.keys(this.state.votes)[index]
        return {
          text: ANECDOTES[anecdoteNo],
          votes: maxValue,
        }
      }
    }
  }

  render() {
    return (
      <div>
        <Anecdote selected={this.state.selected} />
        <Button text="Vote" handleClick={this.state.vote(this.state.selected)} />
        <Button text="Random Anecdote" handleClick={this.state.randomize} />
        <h2>Anecdote with the most votes:</h2>
        <BestAnecdote anecdote={this.state.best()} />
      </div>
    )
  }
}

const Anecdote = ({ selected }) => {
  return (
    <p>{ ANECDOTES[selected] }</p>
  )
}

const Button = ({ text, handleClick }) => ( 
  <button onClick={handleClick}>{ text }</button> 
)

const BestAnecdote = ({ anecdote }) => {
  if (anecdote.text === undefined) return ( <p>No votes</p> )

  return (
    <div>
      <p>{ anecdote.text }</p>
      <p>It has { anecdote.votes } votes</p>
    </div>
  )
}

const ANECDOTES = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App />,
  document.getElementById('root')
)

export default App
