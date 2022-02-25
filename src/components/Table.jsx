import React from 'react';

import '../styles/components/Table.scss';
import PaitentInfo from './PaitentInfo';

const Table = ({ data }) => {
  const tableColumns = ['age', 'birthDatetime', 'ethnicity', 'gender', 'isDeath', 'personID', 'race'];

  return (
    <table className="contentTable">
      <thead>
        <tr>
          {tableColumns?.map((el) => (
            <th className="titleTh" key={el}>
              {el}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {/* {data?.map((el) => {
          const Rows = tableColumns.map((column, index) =>
            column === 'isDeath' ? (
              <td key={column + index} className="listTd">
                {el[column] ? 'true' : 'false'}
              </td>
            ) : (
              <td key={column + index} className="listTd">
                {el[column]}
              </td>
            ),
          );
          return (
            <tr className="listTr" onClick={handleTableRow(el.personID)}>
              {Rows}
            </tr>
          );
        })} */}

        {data?.map((el) => (
          <PaitentInfo data={el} tableColumns={tableColumns} />
        ))}
      </tbody>
    </table>
  );
};

export default Table;
