const CountriesFind = ({ countries }) => {
    return (
        <div>
            {countries.map((c, index) => <p key={c.cca3}>{c.name.common}</p>)}
        </div>
    )
}

export default CountriesFind