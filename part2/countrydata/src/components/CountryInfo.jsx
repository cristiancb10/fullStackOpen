const CountryInfo = ({ country }) => {
    return (
        <div>
            <h2>{country.name.common}</h2>
            <p>Capital {country.capital?.join(', ')}</p>
            <p>Area {country.area}</p>
            <h2>Languages</h2>
            <LanguagesList list={country.languages}/>
            <img src={country.flags.png} alt={`Flag of ${country.name.common}`}/>
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