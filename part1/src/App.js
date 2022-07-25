import { useState } from "react";

const FeedbackHead = ({ headText }) => <h1>{headText}</h1>;

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const StatText = ({ text }) => <h2>{text}</h2>;

const FeedbackValue = ({ text, values }) => {
  const value =
    text === "good" ? values[0] : text === "neutral" ? values[1] : values[2];

  console.log("value", value);
  if (!values[0] && !values[1] && !values[2]) {
    return;
  } else {
    return (
      <div>
        <span>{text}</span> <span>{value}</span>
      </div>
    );
  }
};

const FeedbackStatValue = ({ text, value }) => (
  <div>
    <span>{text}</span> <span>{value}</span>
  </div>
);

const Statistics = (props) => {
  const { texts, good, neutral, bad, avg, positive } = props;

  if (!good && !neutral && !bad) {
    return <p>No feedback given</p>;
  }

  return (
    <>
      <FeedbackStatValue value={good + neutral + bad} text={texts[0]} />
      <FeedbackStatValue value={avg} text={texts[1]} />
      <FeedbackStatValue value={positive} text={texts[2]} />
    </>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const avg =
    good || neutral || bad
      ? (good * 1 + neutral * 0 + bad * -1) / (good + neutral + bad)
      : 0;
  const positive =
    good || neutral || bad ? (good / (good + neutral + bad)) * 100 + " %" : 0;

  const textArr = ["good", "neutral", "bad"];
  const statTextArr = ["all", "average", "positive"];

  return (
    <>
      <FeedbackHead headText="Give feedback" />
      <Button text={textArr[0]} handleClick={() => setGood(good + 1)} />
      <Button text={textArr[1]} handleClick={() => setNeutral(neutral + 1)} />
      <Button text={textArr[2]} handleClick={() => setBad(bad + 1)} />
      <StatText text="Statistics" />
      <FeedbackValue text={textArr[0]} values={[good, neutral, bad]} />
      <FeedbackValue text={textArr[1]} values={[good, neutral, bad]} />
      <FeedbackValue text={textArr[2]} values={[good, neutral, bad]} />
      <Statistics
        texts={statTextArr}
        good={good}
        neutral={neutral}
        bad={bad}
        avg={avg}
        positive={positive}
      />
    </>
  );
};

export default App;
