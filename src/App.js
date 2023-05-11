import { useState } from "react";

function App() {
  const initialPersons = [
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]
  
  const [persons, setPersons] = useState(initialPersons)
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const handleNameInputChange = event => {
    setNewName(event.target.value)
  }

  const handleNumberInputChange = event => {
    setNewNumber(event.target.value)
  }

  const handleFilterInputChange = event => {
    setNewFilter(event.target.value)
  }

  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(newFilter))

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
        number: newNumber,
        id: persons.length + 1
      })
      setPersons(newPersons)
      setNewName('')
      setNewNumber('')
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      filter shown with <input value={newFilter} onChange={handleFilterInputChange} />
      <h2>add a new</h2>
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
      {filteredPersons.map(person => <li key={person.id}>{person.name} {person.number}</li>)}
    </div>
  );
}

export default App;
