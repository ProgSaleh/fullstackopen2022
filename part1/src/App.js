import { useState } from "react";

const FeedbackHead = ({ headText }) => <h1>{headText}</h1>;

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const StatText = ({ text }) => <h2>{text}</h2>;

const StatisticLine = ({ text, value }) => (
  <div>
    <span>{text}</span> <span>{value}</span>
  </div>
);

const NoFeedback = ({ text }) => <p>{text}</p>;

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const all = good + neutral + bad;
  const avg =
    good || neutral || bad
      ? (good * 1 + neutral * 0 + bad * -1) / (good + neutral + bad)
      : 0;
  const positive =
    good || neutral || bad ? (good / (good + neutral + bad)) * 100 + " %" : 0;

  const textArr = ["good", "neutral", "bad"];
  const statTextArr = ["all", "average", "positive"];

  if (!good && !neutral && !bad) {
    return (
      <>
        <FeedbackHead headText="Give feedback" />
        <Button text={textArr[0]} handleClick={() => setGood(good + 1)} />
        <Button text={textArr[1]} handleClick={() => setNeutral(neutral + 1)} />
        <Button text={textArr[2]} handleClick={() => setBad(bad + 1)} />
        <StatText text="Statistics" />
        <NoFeedback text="No feedback given" />
      </>
    );
  } else {
    return (
      <>
        <FeedbackHead headText="Give feedback" />
        <Button text={textArr[0]} handleClick={() => setGood(good + 1)} />
        <Button text={textArr[1]} handleClick={() => setNeutral(neutral + 1)} />
        <Button text={textArr[2]} handleClick={() => setBad(bad + 1)} />
        <StatText text="Statistics" />
        <StatisticLine text={textArr[0]} value={good} />
        <StatisticLine text={textArr[1]} value={neutral} />
        <StatisticLine text={textArr[2]} value={bad} />
        <StatisticLine text={statTextArr[0]} value={all} />
        <StatisticLine text={statTextArr[1]} value={avg} />
        <StatisticLine text={statTextArr[2]} value={positive} />
      </>
    );
  }
};

export default App;
