import { useState } from "react";

function App() {
  const [persons, setPersons] = useState([
    { 
      name: 'Arto Hellas',
      number: '040-1234567'
  }])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleNameInputChange = event => {
    setNewName(event.target.value)
  }

  const handleNumberInputChange = event => {
    setNewNumber(event.target.value)
  }

  const handleSubmitForm = (event) => {
    event.preventDefault()
    // Flag that indicates whether newName already exists in persons
    let alreadyExist = false;
    // Check if the newName is contained persons
    persons.forEach(person => {
      if (person.name === newName){
        alert(`${newName} is already added to phonebook`)
        alreadyExist = true;
      }
    })
    // Only executes if the name is not contained in persons
    if (!alreadyExist) {
      const newPersons = persons.concat({
        name: newName,
        number: newNumber
      })
      setPersons(newPersons)
      setNewName('')
      setNewNumber('')
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmitForm}>
        <div>
          name: <input value={newName} onChange={handleNameInputChange} />
          <br />
          number: <input value={newNumber} onChange={handleNumberInputChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <li key={person.name}>{person.name} {person.number}</li>)}
    </div>
  );
}

export default App;
