import React from 'react'

const Phonebook = ({ persons, filter }) => {
  const tableContent = persons
    .filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
    .map(person => <Person name={ person.name } number={ person.number } key={ person.id } />)
  
  return (
    <table>
      <tbody>
        { tableContent }
      </tbody>
    </table>
  )
}

const Person = ({ name, number }) => 
  <tr>
    <td>{ name }</td>
    <td>{ number }</td>
  </tr>

export default Phonebook