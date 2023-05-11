const PersonForm = (props) => {
  const {handleSubmitForm, newName, handleNameInputChange, newNumber, handleNumberInputChange} = props
  return (
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
  )
}

export default PersonForm