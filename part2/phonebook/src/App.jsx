import './index.css'
import { useEffect, useState } from 'react'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Title from './components/Title'
import PersonList from './components/PersonList'
import Notification from './components/Notification'

import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    async function fetchData() {
      const initialPersons = await personService.getAll()
      setPersons(initialPersons)
    }
    fetchData()
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const addNumber = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    }

    if (persons.some(person => person.name === newName)) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const person = persons.find(person => person.name === newName)
        const changedPerson = { ...person, number: newNumber }
        personService.update(changedPerson)
        setPersons(persons.map(person => person.id !== changedPerson.id ? person : changedPerson))
        setErrorMessage(`${newName}'s number was changed`)
      }
    } else {
      personService.create(personObject);
      setErrorMessage(`${newName} was added`)
      setPersons(persons.concat(personObject))
    }

    setTimeout(() => {
      setErrorMessage(null)
    }, 3000)
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <Title title="Phonebook" />
      {errorMessage && <Notification message={errorMessage} />}
      <Filter filter={filter} onChange={handleFilterChange} />
      <Title title="add a new" />
      <PersonForm addPerson={addNumber} name={newName} number={newNumber} onNameChange={handleNameChange} onNumberChange={handleNumberChange} />
      <Title title="Numbers" />
      <PersonList persons={persons} filter={filter} setPersons={setPersons} />
    </div>
  )
}

export default App