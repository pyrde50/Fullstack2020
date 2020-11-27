import react from 'react'

const AddPerson = ( props ) => {
    return (
        <form>
        <div>name: <input value={props.newName} onChange={props.editnewName} /> </div> 
        <div>number: <input value={props.newNumber} onChange={props.editNewNumber} /> </div> 
        <div><button type="submit" onClick={props.addPerson}>add</button></div>
      </form>
    )
  }

  export default AddPerson