import { useEffect, useState } from "react"
import CountryInfo from "./CountryInfo"

const CountriesFind = ({ countries }) => {
    const [ selectedCountry, setSelectedCountry ] = useState('')

    useEffect(() => {
        setSelectedCountry('')
    },[countries])

    const selected = countries.find(c => c.cca3 === selectedCountry)

    return (
        <div>
            {countries.map(c =>
                <p key={c.cca3}>
                    {c.name.common}{' '}
                    <button onClick={() => setSelectedCountry(c.cca3)}>Show</button>          
                </p>
            )}
            {selected && <CountryInfo country={selected}/>}
        </div>
    )
}

export default CountriesFind