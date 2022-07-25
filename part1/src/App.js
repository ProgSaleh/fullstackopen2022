import { useState } from "react";

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const AnecdoteHead = ({ text }) => <h1>{text}</h1>;

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState([0, 0, 0, 0, 0, 0, 0]);

  const generateNum = () =>
    Number(String(Math.random() * anecdotes.length).substring(0, 1));

  const handleVotes = () => {
    const updatedStateArr = [...votes];
    updatedStateArr[selected] += 1;
    setVotes(updatedStateArr);
  };

  const votesMax = Math.max(...votes);
  let voteWinner = "";

  votes.forEach((v) => {
    if (v === votesMax) {
      voteWinner = anecdotes[votes.indexOf(v)];
    }
  });

  return (
    <div>
      <AnecdoteHead text="Anecdote of the day" />
      <p>{anecdotes[selected]}</p>
      <p>
        has {votes[selected]} {votes[selected] === 1 ? "vote" : "votes"}
      </p>
      <Button handleClick={handleVotes} text="vote" />
      <Button
        handleClick={() => setSelected(generateNum)}
        text="next anecdote"
      />
      <AnecdoteHead text="Anecdote with most votes" />
      <p>{voteWinner}</p>
    </div>
  );
};

export default App;
