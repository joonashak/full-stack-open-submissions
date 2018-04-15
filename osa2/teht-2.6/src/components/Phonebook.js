import React from 'react';

const Phonebook = ({ persons, filter, deleteAction }) => {
  const tableContent = persons
    .filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
    .map(person => <Person person={person} action={deleteAction} key={person.id} />);

  return (
    <table>
      <tbody>
        { tableContent }
      </tbody>
    </table>
  );
};

const Person = ({ person, action }) => (
  <tr>
    <td>{ person.name }</td>
    <td>{ person.number }</td>
    <td>
      <button onClick={action(person.id)}>poista</button>
    </td>
  </tr>
);

export default Phonebook;
