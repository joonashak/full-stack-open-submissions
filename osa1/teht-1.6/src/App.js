import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      good: 0,
      neutral: 0,
      negative: 0,
    }
  }

  registerFeedback = (rating) => () => {
    this.setState({ [rating]: this.state[rating] + 1 })
  }

  render() {
    return (
      <div>
        <Heading text="Anna palautetta" />
        <Button title="hyvä" handleClick={this.registerFeedback('good')} />
        <Button title="neutraali" handleClick={this.registerFeedback('neutral')} />
        <Button title="huono" handleClick={this.registerFeedback('negative')} />

        <Heading text="Tilastot" />
        <Statistics votes={this.state} />
      </div>
    );
  }
}

const Heading = ({ text }) => ( <h2>{ text }</h2> )

const Button = ({ title, handleClick }) => (
  <button onClick={handleClick}>
    { title }
  </button>
)

const Statistics = ({ votes }) => {
  if ( votes.good === 0 && votes.neutral === 0 && votes.negative === 0) {
    return ( <p>Tilastot näytetään, kunhan palautetta on ensin saatu.</p> )
  }

  const totalVotes = votes.good + votes.neutral + votes.negative
  const mean = (votes.good - votes.negative) / totalVotes
  const positiveRatio = votes.good / totalVotes
  console.log(totalVotes)

  return (
    <table>
      <tbody>
        <Statistic text="Hyviä" value={ votes.good } />
        <Statistic text="Neutraaleja" value={ votes.neutral } />
        <Statistic text="Huonoja" value={ votes.negative } />
        <Statistic text="Keskiarvo" value={ mean } />
        <Statistic text="Hyvien suhde" value={ positiveRatio * 100 + ' %' } />
      </tbody>
    </table>
  )
}

const Statistic = ({ text, value }) => (
  <tr>
    <td>{ text }</td>
    <td>{ value }</td>
  </tr>
)

export default App;
