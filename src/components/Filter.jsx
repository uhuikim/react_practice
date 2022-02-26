import React from 'react';

import FilterDropDown from './FilterDropDown';

import '../styles/components/Filter.scss';

const Filter = ({ handleFilter, handleMinMaxFilter, handleResetButton, graphList, filter, ageFilter }) => {
  return (
    <div className="FilterWrap">
      {graphList?.map((el) => {
        const title = Object.keys(el);
        return (
          <div className="FilterBox">
            <p className="FilterTitle">{title[0]}</p>
            <div className="Filter">
              <FilterDropDown title={title[0]} dropMenu={el[title]} handleDropDown={handleFilter} filter={filter} />
            </div>
          </div>
        );
      })}
      <div className="FilterBox">
        <p className="FilterTitle">age</p>
        <label className="AgeFilter">
          min <input type="number" value={ageFilter.min || ''} onChange={handleMinMaxFilter('min')} />
        </label>

        <label className="AgeFilter">
          max <input type="number" value={ageFilter.max || ''} onChange={handleMinMaxFilter('max')} />
        </label>
      </div>

      <div className="ButtonGroup">
        <button className="ResetButton" type="button" onClick={handleResetButton}>
          초기화
        </button>
      </div>
    </div>
  );
};

export default Filter;
