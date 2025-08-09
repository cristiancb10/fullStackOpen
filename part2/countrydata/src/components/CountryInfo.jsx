import { useState, useEffect } from "react"
import axios from "axios"

const CountryInfo = ({ country }) => {
    const [ weather, setWeather] = useState({})
    const api_key = import.meta.env.VITE_SOME_KEY

    
    useEffect(() => {
        if(country) {
        const lat = country.latlng[0]
        const lon = country.latlng[1]

        if(!lat || !lon) {
            return  
        }

        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`)
            .then(response => {
                setWeather(response.data)
            })
            .catch(error => {
            console.log('Error:',error)
            })
        }
    }, [country, api_key])
    
    return (
        <div>
            <h2>{country.name.common}</h2>
            <p>Capital {country.capital?.join(', ')}</p>
            <p>Area {country.area}</p>
            <h2>Languages</h2>
            <LanguagesList list={country.languages}/>
            <img src={country.flags.png} alt={`Flag of ${country.name.common}`}/>

            {weather?.main && (
                <>
                    <h2>Weather in {country.capital}</h2>
                    <p>Temperature {weather.main.temp}</p>    
                    <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} 
                        alt={weather.weather[0].description}/>
                    <p>Wind {weather.wind.speed} m/s</p>           
                </>
            )}
        </div>
    )
}

const LanguagesList = ({ list }) => {
    return (
        <ul>
            {Object.values(list).map((language, index) => <li key={index}>{language}</li>)}
        </ul>
    )
} 

export default CountryInfo