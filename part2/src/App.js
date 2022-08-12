import { useState, useEffect } from "react";
import axios from "axios";
import LengthWarning from "./components/LengthWarning";
import Country from "./components/Country";

const SearchControl = ({ handleSearch }) => (
  <div>
    <label>
      find countries: <input onChange={handleSearch} type="text" />
    </label>
  </div>
);

const CountryName = ({ name }) => <li>{name}</li>;

const ViewableList = ({ userInput, countries }) => {
  let nameTexts = countries.map((c) => c.name.common);

  const searchedCountryName = nameTexts.filter((name) =>
    name.toLowerCase().includes(userInput.toLowerCase())
  );

  if (searchedCountryName && searchedCountryName.length) {
    nameTexts = searchedCountryName;
  }

  const foundCountry = countries.find((c) =>
    c.name.common.toLowerCase().startsWith(userInput.toLowerCase())
  );

  if (nameTexts.length <= 10) {
    if (nameTexts.length === 1 && foundCountry) {
      return <Country info={foundCountry} />;
    }

    return (
      <ul>
        {nameTexts.map((n) => (
          <CountryName key={Math.random()} name={n} />
        ))}
      </ul>
    );
  } else if (userInput && userInput.length && searchedCountryName.length) {
    return (
      <div>
        <LengthWarning />
      </div>
    );
  }
};

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchField, setSearchField] = useState("");

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountries(response.data.filter((c) => c.name.common !== "Israel"));
    });
  }, []);

  if (countries && countries.length) {
    const handleSearchField = (event) => {
      setSearchField(event.target.value);
    };

    return (
      <div>
        <SearchControl handleSearch={handleSearchField} />
        <ViewableList userInput={searchField} countries={countries} />
      </div>
    );
  }
};

export default App;
