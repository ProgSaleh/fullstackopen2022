const Form = (props) => (
  <form onSubmit={props.addName}>
    <NameControl newName={props.newName} addPerson={props.addPerson} />
    <PhoneNumberControl
      newNumber={props.newNumber}
      addNumber={props.addNumber}
    />
    <SubmitControl />
  </form>
);

const NameControl = ({ newName, addPerson }) => (
  <div>
    name: <input value={newName} onChange={addPerson} />
  </div>
);

const PhoneNumberControl = ({ newNumber, addNumber }) => (
  <div>
    number: <input value={newNumber} onChange={addNumber} />
  </div>
);

const SubmitControl = () => (
  <div>
    <button type="submit">add</button>
  </div>
);

export default Form;
