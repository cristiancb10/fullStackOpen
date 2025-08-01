import { useState } from "react";
import Person from "./components/Person";

const App = () => {
  const [ persons, setPersons ] = useState([{ name: 'Arto Hellas' }])
  const [ newName, setName ] = useState('')

  const handleNameChange = (event) => {
    setName(event.target.value)
  }

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName
    }
    setPersons(persons.concat(nameObject))
    setName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input 
            value={newName}
            onChange={handleNameChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.length === 0
      ? '...'
      : persons.map(person => <Person key={person.name} person={person}/>)}
    </div>
  )
}

export default App