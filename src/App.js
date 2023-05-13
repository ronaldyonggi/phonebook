import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import DisplayPerson from "./components/DisplayPersons";
import personsService from './services/persons'
import Notification from "./components/Notification";


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [notification, setNotification] = useState('')

  // Initial fetch data from DB
  useEffect(() => {
   personsService
    .getAll()
    .then(initialPersons => {
      setPersons(initialPersons)
    })
  },[])

  const handleNameInputChange = event => {
    setNewName(event.target.value)
  }

  const handleNumberInputChange = event => {
    setNewNumber(event.target.value)
  }

  const handleFilterInputChange = event => {
    setNewFilter(event.target.value)
  }

  // Delete an existing person
  const deleteHandler = deletedPerson => {
    if (window.confirm(`Delete ${deletedPerson.name}?`)){
      personsService
        .deletePerson(deletedPerson.id)
        // Rerender name list
        .then(() => {
          setPersons(persons.filter(person => person.id !== deletedPerson.id))
        })
    }
  }

  // Adding a new person
  const handleSubmitForm = (event) => {
    event.preventDefault()
    // Flag that indicates whether newName already exists in persons
    let alreadyExist = false;
    // Check if the newName is contained persons
    persons.forEach(person => {
      if (person.name === newName){
        if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
          personsService
            .update(person.id, {...person, number: newNumber})
            .then(updatedPerson => {
              setPersons(persons.map(p => p.id === person.id ? updatedPerson : p ))
              setNewName('')
              setNewNumber('')
              setNotification(`${updatedPerson.name}'s number is updated to ${updatedPerson.number}`)
              setTimeout(() => {
                setNotification('')
              }, 5000)
            })
        }
        alreadyExist = true;
      }
    })

    // Only executes if the name is not contained in persons
    if (!alreadyExist) {
      // Create a new object of the new person
      const newPerson = {
        name: newName,
        number: newNumber
      }

      // Post request
      personsService
        .create(newPerson)
        .then(newlyAddedPerson => {
          setPersons(persons.concat(newlyAddedPerson))
          setNewName('')
          setNewNumber('')
          setNotification(`Added ${newlyAddedPerson.name}`)
          // Reset notification to blank
          setTimeout(() => {
            setNotification('')
          }, 5000)
        })
    }
  }

  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(newFilter))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification}/>
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
      <DisplayPerson 
        filteredPersons={filteredPersons}
        deleteHandler={deleteHandler}
        />
    </div>
  );
}

export default App;
