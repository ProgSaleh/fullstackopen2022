import { useState } from "react";
import Form from "./components/Form";

const Person = ({ person }) => (
  <p>
    {person.name} {person.phone}
  </p>
);

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Saleh Hussain", phone: "0500050055" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const addPerson = (event) => setNewName(event.target.value);

  const addNumber = (event) => setNewNumber(event.target.value);

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
    // setPersons(persons.concat(newPerson));
    setPersons([...persons, newPerson]);
    setNewName("");
    setNewNumber("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
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
