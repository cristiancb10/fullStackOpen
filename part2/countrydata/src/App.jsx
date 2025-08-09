import { useState, useEffect } from "react"
import axios from "axios"
import CountriesFind from "./components/countriesFind"
import CountryInfo from "./components/CountryInfo"

const App = () => {
  const [ value, setValue ] = useState('') 
  const [ country, setCountry] = useState([])
  const [ filter, setFilter ] = useState([])

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountry(response.data)
      })
  }, [])

  useEffect(() => {
    if(value === '') {
      setFilter([])
      return
    }

    console.log('fetching contries...')
    
    const countries = country.filter(c => 
      c.name.common.toLowerCase().includes(value.toLowerCase())
    )

    setFilter(countries)
    
  }, [value, country])

  const handleChange = (event) => setValue(event.target.value)

  return (
    <div>
      <form>
        find countries <input value={value} onChange={handleChange}/>
      </form>
        {filter.length > 10
          ? <p>Too many matches, specify another filter</p>
          : filter.length === 1
            ? <CountryInfo country={filter[0]}/>
            : <CountriesFind countries={filter}/>
        }
    </div>
  )
}

export default App