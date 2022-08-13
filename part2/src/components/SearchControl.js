const SearchControl = ({ handleSearch }) => (
  <div>
    <label>
      find countries: <input onChange={handleSearch} type="text" />
    </label>
  </div>
);

export default SearchControl;
