import { useState } from "react";
import Person from "./components/Person";

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', 
      phone: '040-1234567'
    }
  ])

  const [ newName, setName ] = useState('')
  const [ newPhone, setPhone ] = useState('')

  const handleNameChange = (event) => {
    setName(event.target.value)
  }

  const handlePhoneChange = (event) => {
    setPhone(event.target.value)
  }

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      phone: newPhone
    }
    const nameExists = persons.some(person => person.name.toLowerCase() === newName.toLowerCase())
    nameExists ? alert(`${newName} is already added to phonebook`) 
    : setPersons(persons.concat(nameObject))
    
    setName('')
    setPhone('') 
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          number: <input value={newPhone} onChange={handlePhoneChange}/>
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