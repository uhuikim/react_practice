import React from 'react';

const InputRow = ({ inputValue, handleInput }) => {
  return (
    <div className="breadInput">
      table row 설정 :
      <input type="number" value={inputValue} onChange={handleInput} placeholder="table row 설정" />
    </div>
  );
};

export default InputRow;
