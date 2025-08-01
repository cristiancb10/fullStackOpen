const PersonForm = ({ addName, valueName, valueNumber, handleNameChange, handleNumberChange}) => {
    return (
        <form onSubmit={addName}>
            <div>
                name: <input value={valueName} onChange={handleNameChange}/>
            </div>
            <div>
                number: <input value={valueNumber} onChange={handleNumberChange}/>
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm