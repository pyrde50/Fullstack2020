import react from 'react'

const Country = ( props ) => {

   return (
    <div key = {props.country.name}>
    <h1>{props.country.name}</h1>
    <div>capital {props.country.capital}</div>
    <div>population {props.country.population}</div>
    <h3>languages</h3>
    {props.country.languages.map(lang => (
      <li key = {lang.name}>
        {lang.name}
      </li>
    )
    )
    }
    <img src={props.country.flag} width={100}/>
  </div>
   ) 

}

export default Country