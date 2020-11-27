import react from 'react'

const FilterPersons = (props) => {
 return (
   <div>
   <div>filter shown with<input value={props.findName} onChange={props.editFindName} /> </div> 
  </div>
  )
}

  export default FilterPersons