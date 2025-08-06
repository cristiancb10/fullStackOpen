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
  const [ addMessage, setAddMessage ] = useState(null)
  const [ errorMessage, setErrorMessage ] = useState(null)

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
      name: newName.trim(),
      number: newNumber
    }
    
    const personFind = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())
    const nameExists = Boolean(personFind)

    const changedNumber = personFind ? { ...personFind, number: nameObject.number } : null

    if(!nameExists) {
      personService
        .create(nameObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setName('')
          setNumber('') 
          setAddMessage(`Added ${nameObject.name}`)
          setTimeout(() => setAddMessage(null), 5000)
        })  
    }
    else {
      if(window.confirm(`${nameObject.name} is already added to phonebook, replace the old number with a new one?`)) {
        personService
          .update(personFind.id, changedNumber)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== personFind.id ? person : returnedPerson))
            setName('')
            setNumber('') 
            setAddMessage(`Updated number of ${nameObject.name}`)
            setTimeout(() => setAddMessage(null), 5000)    
          })
          .catch(error => {
            setErrorMessage(`Information of ${nameObject.name} has already been removed from server`)
            setPersons(persons.filter(person => person.id !== personFind.id))
            setTimeout(() => setErrorMessage(null), 5000)         
            }
          )
      }
      else {
        return null
      }
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

  const Notification = ({ message }) => {
    if(message === null) {
      return null
    }
    return (
      <div className="added">
        {message}
      </div>
    )
  }

  const NotificationError = ({message}) => {
    if(message === null) {
      return null
    }   
    return (
      <div className="error">
        {message}
      </div>
    )
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={addMessage}/>
      <NotificationError message={errorMessage}/>
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