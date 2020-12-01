import react, { useEffect, useState } from 'react'
import axios from 'axios'

const Weather = (props) => {
    const [getWeather, setWeather] = useState('')
    const [ image, setImage ] =useState('')
    const api_key = process.env.REACT_APP_API_KEY
    useEffect(() => {
      axios.get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${props.country.capital}`)
         .then(response => {
            console.log(response.data.current)
            setImage(response.data.current.weather_icons[0])
            setWeather(response.data.current)
          }

            )

    }, [])
    return (
        <div>
       <div><b>temperature:</b> {getWeather.temperature} celcius</div>
       <img src={image} width={50}/>
       <div><b>wind:</b> {getWeather.wind_speed} mph direction {getWeather.wind_dir}</div>
        </div>
    )
}
 
/* {getWeather.weather_icons.map(pic => (
            <div key={pic}>
                <img src={pic}/>
            </div>
          )
          )
          }**/
//<img src={getWeather.weather_icons[0]} width={50}/>
export default Weather