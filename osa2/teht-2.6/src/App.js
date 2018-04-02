import React from 'react'
import axios from 'axios'
import AddPerson from './components/AddPerson'
import Phonebook from './components/Phonebook'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      persons: [],
      filter: '',
    }
  }

  render() {
    return (
      <div>
        <h2>Puhelinluettelo</h2>
        Rajaa näytettäviä: &nbsp;
        <input 
          value={ this.state.filter }
          onChange={ this.filter }
        />
        <h3>Lisää uusi</h3>
        <AddPerson action={ this.addPerson } />
        <h3>Numerot</h3>
        <Phonebook  persons={ this.state.persons } filter={ this.state.filter } />
      </div>
    )
  }

  componentDidMount() {
    axios
      .get('http://localhost:3001/persons')
      .then(res => this.setState({ persons: res.data }))
  }

  addPerson = ({ name, number }) => {
    if (this.personExists(name)) return

    const id = Math.max(...this.state.persons.map(person => person.id)) + 1
    const persons = this.state.persons.concat({ name, number, id })
    this.setState({ persons })
  }

  personExists = name => {
    const names = this.state.persons.map(person => person.name.toLowerCase())
    return names.includes(name.toLowerCase())
  }

  filter = event => this.setState({ filter: event.target.value })
}

export default App