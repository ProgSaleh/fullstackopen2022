import { useState, useEffect } from "react";
import axios from "axios";
import Note from "./components/Note";

const App = () => {
  const [notes, setNotes] = useState([]);
  // const [newNote, setNewNote] = useState("");
  // const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:3001/notes").then((res) => {
      // console.log(res.data.response.data);
      setNotes(res.data.response.data);
    });
  }, []);

  return (
    <ul>
      {notes.map((n) => (
        <Note key={n.id} text={n.content} />
      ))}
    </ul>
  );
};

export default App;
