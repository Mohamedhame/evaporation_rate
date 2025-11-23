const Inputs = ({ id, value, onHandleCahnge }) => {
  return (
    <div className="inputs">
      <div className="floating-input">
        <input
          id={id}
          type="number"
          required
          placeholder=" "
          value={value}
          onChange={(e) => onHandleCahnge(e.target.value)}
        />
        <label htmlFor={id}>{`${id}`}</label>
      </div>
    </div>
  );
};

export default Inputs;
