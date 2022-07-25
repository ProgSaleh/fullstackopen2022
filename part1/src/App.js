import { useState } from "react";

const FeedbackHead = ({ headText }) => <h1>{headText}</h1>;

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const StatText = ({ text }) => <h2>{text}</h2>;

const StatisticsTable = (props) => {
  const { valuesArr, textsArr, statTextArr, all, avg, positive } = props;

  return (
    <table>
      <tbody>
        <tr>
          <td>{textsArr[0]}</td>
          <td>{valuesArr[0]}</td>
        </tr>
        <tr>
          <td>{textsArr[1]}</td>
          <td>{valuesArr[1]}</td>
        </tr>
        <tr>
          <td>{textsArr[2]}</td>
          <td>{valuesArr[2]}</td>
        </tr>
        <tr>
          <td>{statTextArr[0]}</td>
          <td>{all}</td>
        </tr>
        <tr>
          <td>{statTextArr[1]}</td>
          <td>{avg}</td>
        </tr>
        <tr>
          <td>{statTextArr[2]}</td>
          <td>{positive}</td>
        </tr>
      </tbody>
    </table>
  );
};

const NoFeedback = ({ text }) => <p>{text}</p>;

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const getAll = () => good + neutral + bad;
  const getAvg = () => {
    return good || neutral || bad
      ? (good * 1 + neutral * 0 + bad * -1) / (good + neutral + bad)
      : 0;
  };
  const getPositive = () => {
    return good || neutral || bad
      ? (good / (good + neutral + bad)) * 100 + " %"
      : 0;
  };

  const valuesArr = [good, neutral, bad];
  const textArr = ["good", "neutral", "bad"];
  const statTextArr = ["all", "average", "positive"];

  if (!getAll()) {
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
        <StatisticsTable
          valuesArr={valuesArr}
          textsArr={textArr}
          statTextArr={statTextArr}
          all={getAll()}
          avg={getAvg()}
          positive={getPositive()}
        />
      </>
    );
  }
};

export default App;
