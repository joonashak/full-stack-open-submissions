import React from 'react';
import AddPerson from './components/AddPerson';
import Phonebook from './components/Phonebook';
import service from './services/PhonebookService';
import Notification from './components/Notification';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      persons: [],
      filter: '',
      notification: '',
    };
  }

  render() {
    return (
      <div>
        <h2>Puhelinluettelo</h2>
        Rajaa näytettäviä: &nbsp;
        <input
          value={this.state.filter}
          onChange={this.filter}
        />
        <h3>Lisää uusi</h3>
        <AddPerson action={this.addPerson} />
        <h3>Numerot</h3>
        <Phonebook
          persons={this.state.persons}
          filter={this.state.filter}
          deleteAction={this.deletePerson}
        />
        <Notification message={this.state.notification} />
      </div>
    );
  }

  componentDidMount() {
    service.getAll().then(persons => this.setState({ persons }));
  }

  addPerson = ({ name, number }) => {
    const person = this.getPersonByName(name);
    person ? this.updatePerson(person, number) : this.createPerson(name, number);
  }

  createPerson = (name, number) => {
    service
      .create({ name, number })
      .then((newPerson) => {
        console.log('saatiin takas:', newPerson);
        this.setState({ persons: this.state.persons.concat(newPerson) });
        this.showNotification(`${name} lisätty puhelinluetteloon.`);
      });
  }

  updatePerson = (person, number) => {
    service
      .put(person.id, { name: person.name, number })
      .then((newPerson) => {
        const persons = this.state.persons.filter(p => p.id !== person.id);
        this.setState({ persons: persons.concat(newPerson) });
        this.showNotification(`Henkilön ${person.name} numero päivitetty.`);
      })
      .catch((error) => {
        /* const persons = this.state.persons.filter(p => p.id !== person.id);
        this.setState({ persons });
        this.createPerson(person.name, number); */
        console.log(error);
      });
  }

  deletePerson = id => () => {
    if (!window.confirm('Haluatko varmasti poistaa?')) return null;

    service
      .remove(id)
      .then(() => {
        const persons = this.state.persons.filter(p => p.id !== id);
        this.setState({ persons });
        this.showNotification('Henkilö poistettu.');
      });
  }

  personExists = (name) => {
    const names = this.state.persons.map(person => person.name.toLowerCase());
    return names.includes(name.toLowerCase());
  }

  getPersonByName = name => this.state.persons.find(p => p.name === name)

  filter = event => this.setState({ filter: event.target.value })

  showNotification = (notification) => {
    this.setState({ notification });
    setTimeout(() => {
      this.setState({ notification: '' });
    }, 3000);
  }
}

export default App;

