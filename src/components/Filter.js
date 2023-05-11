const Filter = ({newFilter, handleFilterInputChange}) => {
  return (
    <>
      filter shown with  <input value={newFilter} onChange={handleFilterInputChange}/>
    </>
  )
}

export default Filter