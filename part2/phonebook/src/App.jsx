import { useEffect, useState } from "react";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import personService from "./services/persons"

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setName ] = useState('')
  const [ newNumber, setNumber ] = useState('')
  const [ filter, setFilter ] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const handleNameChange = (event) => setName(event.target.value)

  const handleNumberChange = (event) => setNumber(event.target.value)

  const handleFilterChange = (event) => setFilter(event.target.value)

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber
    }
    
    const nameExists = persons.some(person => person.name.toLowerCase() === newName.toLowerCase())
    
    if(!nameExists) {
      personService
        .create(nameObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setName('')
          setNumber('') 
        })
    }
    else {
      alert(`The name ${nameObject.name} has already been registered`)
    }
  }

  const deletePersonId = id => {
    const person = persons.find(p => p.id === id)

    if(window.confirm(`Delete ${person.name}?`)){
      personService
      .deletePerson(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id))
      })
    }
    else {
      return
    }
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
      : personsToShow.map( person => 
          <Persons 
            key={person.id} 
            person={person}
            deletePerson={() => deletePersonId(person.id)}
          />
      )}
    </div>
  )
}

export default App