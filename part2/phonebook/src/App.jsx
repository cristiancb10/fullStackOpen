import { useState } from "react";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-1234567', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }    
  ])

  const [ newName, setName ] = useState('')
  const [ newNumber, setNumber ] = useState('')
  const [ filter, setFilter ] = useState('')

  const handleNameChange = (event) => setName(event.target.value)

  const handleNumberChange = (event) => setNumber(event.target.value)

  const handleFilterChange = (event) => setFilter(event.target.value)

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }
    
    const nameExists = persons.some(person => person.name.toLowerCase() === newName.toLowerCase())
    
    if (nameExists) {
      alert(`${newName} is already added to phonebook`) 
    }
    else {
      setPersons(persons.concat(nameObject))
    }

    setName('')
    setNumber('') 
  }

  const personsToShow = persons.filter(person => 
    person.name.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} handleFilterChange={handleFilterChange}/>

      <h2>add a new</h2>
      <PersonForm addName={addName} valueName={newName} valueNumber={newNumber}
        handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}/>

      <h2>Numbers</h2>
      {persons.length === 0
      ? '...'
      : personsToShow.map(person => <Persons key={person.id} person={person}/>)}
    </div>
  )
}

export default App