const express = require("express");
const morgan = require("morgan"); // I actually don't like morgan!
const app = express();

let persons = [
  {
    id: 0,
    name: "Saleh Hussain",
    number: "020211",
  },
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.use(express.json()); // to automate the parsing of data coming from frontend...

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/info", (req, res) => {
  const currentLength = persons.length;
  const date = new Date();

  res.send(
    `<div><h3>Phonebook has info for ${currentLength} people</h3><h3>${date}</h3></div>`
  );
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((p) => p.id === id);

  if (!person) {
    res.status(404).end();
  }

  res.json(person);
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((p) => p.id !== id);

  res.status(204).end();
});

app.post("/api/persons/", (req, res) => {
  const newPerson = req.body;

  if (!newPerson.name || !newPerson.number) {
    return res
      .status(400)
      .json({ error: "Please provide correct name and number!" });
  }

  if (persons.find((p) => p.name === newPerson.name)) {
    return res
      .status(400)
      .json({ error: `(${newPerson.name}) already exists!` });
  }

  const person = {
    id: getNewId(),
    name: newPerson.name,
    number: newPerson.number,
  };

  persons = [...persons, person];
  res.json(persons); // return the updated list.
});

//
// util functions
//

const getNewId = () =>
  persons.length
    ? Math.floor(Math.random() * Math.max(...persons.map((p) => p.id)) + 99)
    : 0;

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
