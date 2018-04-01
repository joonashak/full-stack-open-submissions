import React from 'react'
import AddPerson from './components/AddPerson'
import Phonebook from './components/Phonebook'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      persons: [
        { name: 'Arto Hellas', number: '040-123456', id: 0 },
        { name: 'Martti Tienari', number: '050-123456', id: 1 },
        { name: 'Arto Järvinen', number: '060-123456', id: 2 },
        { name: 'Lea Kutvonen', number: '070-123456', id: 3 },
      ],
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