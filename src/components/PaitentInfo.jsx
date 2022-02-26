import React, { useState } from 'react';
import { getPersonData } from '../apis';

const PaitentInfo = ({ data }) => {
  const [state, setState] = useState(false);
  const [personData, setPersonData] = useState('');
  const handlePersonData = async (id) => {
    try {
      const data = await getPersonData(id);
      setPersonData(data?.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleToggle = (personId) => () => {
    setState((prev) => !prev);
    handlePersonData(personId);
  };

  return (
    <>
      <tr className="listTr" onClick={handleToggle(data.personID)}>
        <td>{data.age}</td>
        <td>{data.birthDatetime}</td>
        <td>{data.ethnicity}</td>
        <td>{data.gender}</td>
        <td>{data.isDeath ? 'true' : 'false'}</td>
        <td>{data.personID}</td>
        <td>{data.race}</td>
      </tr>

      {state && (
        <tr>
          <td className="listDetail" colSpan={7}>
            <div className="listDetail__box">
              <p>conditionList</p>
              <p>{personData?.conditionList?.reduce((arr, cur) => arr + ' ' + cur)}</p>
            </div>
            <div className="listDetail__box">
              <p>visitCount</p>
              <p> {personData?.visitCount}</p>
            </div>
          </td>
        </tr>
      )}
    </>
  );
};

export default PaitentInfo;
