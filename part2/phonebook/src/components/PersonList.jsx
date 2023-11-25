import personService from '../services/persons';

const PersonList = ({ persons, filter, setPersons }) => {
    const filteredPersons = persons.filter(
      (person) => person.name.toLowerCase().includes(filter.toLowerCase())
    );

    const handleDelete = (id) => {
      const person = persons.find((person) => person.id === id);
      if (window.confirm(`Delete ${person.name}?`)) {
        personService.deletePerson(id);
        setPersons(persons.filter((person) => person.id !== id));
      }
    }
  
    return (
      <div>
        {filteredPersons.map((person) => (
          <p key={person.id}>
            {person.name} {person.number} <button onClick={() => handleDelete(person.id)}>delete</button>
          </p>
        ))}
      </div>
    );
};

export default PersonList
  