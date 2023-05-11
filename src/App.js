import { useState } from "react";

function App() {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas'}
  ])
  const [newName, setNewName] = useState('')

  const handleInputChange = event => {
    setNewName(event.target.value)
  }

  const handleSubmitForm = (event) => {
    event.preventDefault()
    const newPersons = persons.concat({
      name: newName
    })
    setPersons(newPersons)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmitForm}>
        <div>
          name: <input value={newName} onChange={handleInputChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <li key={person.name}>{person.name}</li>)}
    </div>
  );
}

export default App;
