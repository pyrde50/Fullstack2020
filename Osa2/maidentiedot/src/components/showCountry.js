import { render } from '@testing-library/react'
import react from 'react'
import Country from './country'


const ShowCountries = ( props ) => {

    if (props.filterCountries.length >= 10) {
        return 'too many matches, specify another filter'
    } else if (props.filterCountries.length === 1) {
      return (
          <Country country={props.filterCountries[0]}/>
        
      )
    }

    return (
      props.filterCountries.map(country => (
        <div key={country.name}>
          {country.name} <button value = {country.name} onClick={props.show}>show</button>
        </div>
      )
    )
    )
    
  }

  export default ShowCountries


  