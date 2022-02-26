import React from 'react';

import PaitentInfo from './PaitentInfo';
import { FaSort } from 'react-icons/fa';

import '../styles/components/Table.scss';

const Table = ({ data, handleSort }) => {
  const tableColumns = ['age', 'birthDatetime', 'ethnicity', 'gender', 'isDeath', 'personID', 'race'];

  return (
    <table className="contentTable">
      <thead>
        <tr>
          {tableColumns?.map((el) =>
            el !== 'age' ? (
              <th className="titleTh" key={el}>
                <button type="button" onClick={handleSort(el)}>
                  {el}
                  <FaSort />
                </button>
              </th>
            ) : (
              <th className="titleTh" key={el}>
                {el}
              </th>
            ),
          )}
        </tr>
      </thead>
      <tbody>
        {data?.map((el) => (
          <PaitentInfo key={el.personID} data={el} tableColumns={tableColumns} />
        ))}
      </tbody>
    </table>
  );
};

export default Table;
