import { useState, useEffect } from "react";
import Form from "./components/Form";
import personService from "./services/personServices.js";
import { Notification } from "./components/Notification.js";

// 2.20*: Phonebook step12 [NOT CLEAR.. didn't understand]!

const Person = ({ person, deletePerson }) => (
  <div>
    <span>{person.name}</span> <span>{person.number}</span>{" "}
    <button onClick={deletePerson}>delete</button>
  </div>
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
  const [showToast, setShowToast] = useState(false);

  const addPerson = (event) => setNewName(event.target.value);

  const addNumber = (event) => setNewNumber(event.target.value);

  const ToastVisibilityHandler = () => {
    console.log("in ToastVisibilityHandler()");
    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
    }, 3_000);
  };

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

    event.preventDefault();

    const newPerson = { name: newName, number: newNumber };

    if (persons.find((p) => p.name === newPerson.name)) {
      const msg = `${newName} is already added to the phonebook, replace the old one with a new one?`;
      if (window.confirm(msg)) {
        personService.replacePerson(newPerson).then((res) => {
          setPersons([...persons.filter((p) => p.id !== res.id), res]);
          ToastVisibilityHandler();
        });
      } else {
        setNewName("");
        setNewNumber("");
        return;
      }
    }

    personService.addPerson(newPerson).then((newPersonList) => {
      setPersons([...persons, newPersonList]);
      ToastVisibilityHandler();
      setNewName("");
      setNewNumber("");
    });
  };

  const deletePerson = (id) => {
    const msg = `Delete ${persons.find((p) => p.id === id).name}?`;

    if (window.confirm(msg)) {
      const person = persons.find((p) => p.id === id);
      if (person) {
        personService.deletePerson(id).then((res) => {
          if (res === 200) {
            console.log("success!!!");

            // get new persons list
            personService.getPersons().then((res) => {
              setPersons(res);
            });
            ToastVisibilityHandler();
          } else {
            console.log(res);
          }
        });
      }
    }
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
      <Notification isVisible={showToast} />

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
          deletePerson={() => deletePerson(p.id)}
        />
      ))}
    </div>
  );
};

export default App;
