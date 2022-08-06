import { useState } from "react";

const Person = ({ person }) => <p>{person.name}</p>;

const App = () => {
  const [persons, setPersons] = useState([{ name: "Saleh Hussain" }]);
  const [newName, setNewName] = useState("");

  const addPerson = (event) => {
    setNewName(event.target.value);
  };

  const addName = (event) => {
    event.preventDefault();
    const newPerson = { name: newName };
    // setPersons(persons.concat(newPerson));
    setPersons([...persons, newPerson]);
    setNewName("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name:{" "}
          <input
            /* no need for value...*/ value={newName}
            onChange={addPerson}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
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
