const Country = ({ info }) => {
  if (info && info.languages) {
    return (
      <div>
        <h1>{info.name.common}</h1>
        <p>capital {info.capital[0]}</p>
        <p>area {info.area}</p>
        <h5>languages:</h5>
        <ul>
          {Object.values(info.languages).map((name) => (
            <SingleLang
              key={Math.floor(Math.random() * info.area)}
              name={name}
            />
          ))}
        </ul>
        <img height="100" src={info.flags.svg} alt={info.name.official} />
      </div>
    );
  } else {
    return <p>no country!</p>;
  }
};

const SingleLang = ({ name }) => <li>{name}</li>;

export default Country;
