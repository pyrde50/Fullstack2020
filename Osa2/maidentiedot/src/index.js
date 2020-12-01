import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom';
import axios from 'axios'
import ShowCountries from './components/showCountry'


const App = () => {
  const [possibleCountries, setPossibleCountries] = useState([])
  const [searchCountries, setSearchCountries] = useState('finl')

  useEffect(() => {
    console.log('useEffect')
    axios.get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log(response.data)
        setPossibleCountries(response.data)
      })
  },[])

  const editSearchCountries = (event) => {
    setSearchCountries(event.target.value)
    
  }

  const show = (event) => {
    setSearchCountries(event.target.value)
  }

  const filterCountries = searchCountries.length === 0
  ? possibleCountries
  : possibleCountries.filter(country => country.name.toLowerCase().includes(searchCountries.toLowerCase()) === true)

  
  return (
    <div>
      find countries<input value={searchCountries} onChange={editSearchCountries} />
      <ShowCountries filterCountries={filterCountries} show={show}/>
    </div>
  )

}

ReactDOM.render(<App />, document.getElementById('root'))
