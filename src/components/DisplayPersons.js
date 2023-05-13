const IndividualPerson = ({person, deleteHandler}) => {
  return (
    <div>
      {person.name} {person.number} 
      <button onClick={() => deleteHandler(person)}>delete</button>
    </div>
  )
}

const DisplayPerson = ({filteredPersons, deleteHandler}) => {
  return (
    <>
      {filteredPersons.map(person => (
        <IndividualPerson 
          key={person.id} 
          person={person}
          deleteHandler={deleteHandler}
          />
        ))}
    </>
  )
}

export default DisplayPerson;