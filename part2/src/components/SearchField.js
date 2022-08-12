const SearchField = ({ searchField, addSearch }) => (
  <div>
    search numbers by name: <input value={searchField} onChange={addSearch} />
  </div>
);

export default SearchField;
