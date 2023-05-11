import { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import DisplayPerson from "./components/DisplayPersons";

const App = () => {
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
      <Filter newFilter={newFilter} handleFilterInputChange={handleFilterInputChange} />
      <h3>Add a new</h3>
      <PersonForm 
        handleSubmitForm={handleSubmitForm}
        newName={newName}
        handleNameInputChange={handleNameInputChange}
        newNumber={newNumber}
        handleNumberInputChange={handleNumberInputChange}
      />
      <h2>Numbers</h2>
      <DisplayPerson filteredPersons={filteredPersons}/>
    </div>
  );
}

export default App;
