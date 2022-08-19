import { useState, useEffect } from "react";
import Form from "./components/Form";
import personService from "./services/personServices.js";

// already extracted!

const Person = ({ person }) => (
  <p>
    {person.name} {person.number}
  </p>
);

const SearchField = ({ searchField, addSearch }) => (
  <div>
    <label>search numbers by name:</label>{" "}
    <input value={searchField} onChange={addSearch} />
  </div>
);

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchField, setSearchField] = useState("");

  const addPerson = (event) => setNewName(event.target.value);

  const addNumber = (event) => setNewNumber(event.target.value);

  useEffect(() => {
    personService.getPersons().then((res) => {
      setPersons(res);
    });
  }, []);

  const addFullPerson = (event) => {
    if (!newName || !newNumber) {
      event.preventDefault(); // to prevent reloading the page...
      return;
    }
    if (persons.some((p) => (p.name === newName ? true : false))) {
      alert(`(${newName}) is already added to phonebook!`);
      event.preventDefault(); // to prevent reloading the page...
      setNewName("");
      return;
    }
    event.preventDefault();

    const newPerson = { name: newName, phone: newNumber };
    personService.addPerson(newPerson).then((newPersonList) => {
      setPersons([newPersonList]);
      setNewName("");
      setNewNumber("");
    });
  };

  const addSearch = (event) => {
    setSearchField(event.target.value);

    const searchedPerson = persons.find(
      (p) => p.name.toLowerCase() === event.target.value.toLowerCase()
    );
    if (searchedPerson) {
      setPersons([searchedPerson]);
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <SearchField searchField={searchField} addSearch={addSearch} />

      <br />

      <Form
        addName={addFullPerson}
        newName={newName}
        addPerson={addPerson}
        newNumber={newNumber}
        addNumber={addNumber}
      />

      <h2>numbers</h2>

      {persons.map((p) => (
        <Person
          /* key is NOT reliable... */ key={Math.random() * 10}
          person={p}
        />
      ))}
    </div>
  );
};

export default App;
