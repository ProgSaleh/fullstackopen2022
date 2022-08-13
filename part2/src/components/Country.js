import axios from "axios";

const Country = ({ info }) => {
  if (info && info.languages) {
    const getWeatherInfo = async () => {
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${info.capitalInfo.latlng[0]}&lon=${info.capitalInfo.latlng[1]}&appid=${process.env.REACT_APP_API_KEY}&units=metric`;

      await axios.get(url).then((res) => {
        info.weathering = res.data;
      });
    };

    getWeatherInfo();

    if (info.weathering) {
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
          <h3>Weather in {info.capital[0]}</h3>
          <p>temperature {info.weathering.main.temp} Celsius</p>
          <div>
            <img
              src={`http://openweathermap.org/img/wn/${info.weathering.weather[0].icon}@2x.png`}
              alt={info.name.official}
            />
          </div>
          <p>wind {info.weathering.wind.speed} m/s</p>
        </div>
      );
    }
  } else {
    return <p>no country!</p>;
  }
};

// https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}

const SingleLang = ({ name }) => <li>{name}</li>;

export default Country;
