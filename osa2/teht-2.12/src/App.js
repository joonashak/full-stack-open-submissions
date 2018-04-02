import React from 'react'
import FilteredCountries from './components/FilteredCountries';

class App extends React.Component {

  constructor() {
    super()

    this.state = {
      filter: '',
    }
  }

  render() {
    return (
      <div>
        Find countries: &nbsp;
        <input
          value={ this.state.filter }
          onChange={ this.filter }
        />
        <FilteredCountries filter={ this.state.filter } />
      </div>
    )
  }

  filter = event => this.setState({ filter: event.target.value })
}

export default App
