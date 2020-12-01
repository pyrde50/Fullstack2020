


const Person = ( props ) => {
    return (
      props.filterPeople.map(person => (
        <div key={person.name}>
          {person.name} {person.number} <button value={person.id} onClick={props.DeletePerson}>delete</button>
        </div>
      )
    )
    )
    
  }

  export default Person