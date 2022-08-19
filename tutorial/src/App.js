import { useState, useEffect } from "react";
import Note from "./components/Note";
import noteService from "./services/Notes";
import "./index.css";

const Notification = ({ msg }) => {
  if (msg === null) {
    return null;
  }

  return <div className="error">{msg}</div>;
};

const Footer = () => {
  const footerStyle = {
    color: "crimson",
    fontStyle: "italic",
    fontSize: "16",
  };

  return (
    <div style={footerStyle}>
      <br />
      <em>
        Note app, Department of Computer Science, University of Helsinki 2022
      </em>
    </div>
  );
};

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("a new note...");
  const [showAll, setShowAll] = useState(true);
  const [errorMsg, setErrorMsg] = useState("Some error happend...");

  useEffect(() => {
    noteService.getAll().then((initialNotes) => {
      setNotes(initialNotes);
    });
  }, []);

  const toggleImportanceOf = (id) => {
    // const url = `http://localhost:3001/notes/${id}`;
    const note = notes.find((n) => n.id === id);
    const changedNote = { ...note, important: !note.important };

    noteService
      .update(id, changedNote)
      .then((returnNote) => {
        setNotes(notes.map((n) => (n.id !== id ? n : returnNote)));
      })
      .catch((err) => {
        setErrorMsg(`Note ${note.content} was already removed from server!`);

        setTimeout(() => {
          setErrorMsg(null);
        }, 5000);
        // alert(`the note ${note.content} was already deleted!`);
      });
    setNotes(notes.filter((n) => n.id !== id));
  };

  const addNote = (event) => {
    event.preventDefault();

    const noteObject = {
      content: newNote,
      date: new Date(),
      important: Math.random() > 0.5,
    };

    noteService.create(noteObject).then((returnNote) => {
      setNotes([...notes, returnNote]);
      // setNotes(notes.concat(returnNote));
      setNewNote("");
    });
  };

  const handleNoteChange = (event) => {
    setNewNote(event.target.value);
  };

  return (
    <>
      <h1>Notes</h1>
      <Notification msg={errorMsg} />
      <ul>
        {notes.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
      <Footer />
    </>
  );
};

export default App;
