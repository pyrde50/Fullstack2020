import react from 'react'

const Person = ( props ) => {
    return (
      props.filterPeople.map(person => (
        <div key={person.name}>
          {person.name} {person.number}
        </div>
      )
    )
    )
    
  }

  export default Person