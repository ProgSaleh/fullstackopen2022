import { useState } from "react";

const FeedbackHead = ({ headText }) => <h1>{headText}</h1>;

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const StatText = ({ text }) => <p>{text}</p>;

const FeedbackValue = ({ text, value }) => (
  <div>
    <span>{text}</span> <span>{value}</span>
  </div>
);

const FeedbackStatValue = ({ text, value }) => (
  <div>
    <span>{text}</span> <span>{value}</span>
  </div>
);

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const average =
    good || neutral || bad
      ? (good * 1 + neutral * 0 + bad * -1) / (good + neutral + bad)
      : 0;
  const positive =
    good || neutral || bad ? (good / (good + neutral + bad)) * 100 + " %" : 0;

  return (
    <>
      <FeedbackHead headText="Give feedback" />
      <Button text="good" handleClick={() => setGood(good + 1)} />
      <Button text="neutral" handleClick={() => setNeutral(neutral + 1)} />
      <Button text="bad" handleClick={() => setBad(bad + 1)} />
      <StatText text="Statistics" />
      <FeedbackValue text="good" value={good} />
      <FeedbackValue text="neutral" value={neutral} />
      <FeedbackValue text="bad" value={bad} />
      <FeedbackStatValue value={good + neutral + bad} text="all" />
      <FeedbackStatValue value={average} text="average" />
      <FeedbackStatValue value={positive} text="positive" />
    </>
  );
};

export default App;
