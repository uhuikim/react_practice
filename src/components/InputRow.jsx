import React from 'react';

const InputRow = ({ inputValue, handleInput }) => {
  return <input type="number" value={inputValue} onChange={handleInput} placeholder="table row 설정" />;
};

export default InputRow;
