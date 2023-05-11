const IndividualPerson = ({person}) => {
  return <div>{person.name} {person.number}</div>
}

const DisplayPerson = ({filteredPersons}) => {
  return (
    <>
      {filteredPersons.map(person => <IndividualPerson key={person.id} person={person}/>)}
    </>
  )
}

export default DisplayPerson;