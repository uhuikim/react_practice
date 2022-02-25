import React, { useMemo } from 'react';
import { clamp, range } from 'lodash';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from 'react-icons/ai';

const Pagination = ({ totalPageCount, pageRangeDisplayed = 5, handlePageClick, currentPage }) => {
  const pages = useMemo(() => {
    const halfPageToShow = Math.floor(pageRangeDisplayed / 2);
    const startPage = clamp(currentPage - halfPageToShow, 1, totalPageCount - pageRangeDisplayed + 1);
    const endPage = Math.min(startPage + pageRangeDisplayed - 1, totalPageCount);

    return range(startPage, endPage + 1);
  }, [currentPage, pageRangeDisplayed, totalPageCount]);

  return (
    <ul className="paginationStyle">
      <li>
        <button className="arrowIconStyle" onClick={handlePageClick(1)} type="button">
          <AiOutlineDoubleLeft />
        </button>
      </li>
      <li>
        <button className="arrowIconStyle" onClick={handlePageClick(currentPage - 1)} type="button">
          <IoIosArrowBack />
        </button>
      </li>
      {pages.map((page) => (
        <li className="pageNumberStyle">
          <button className="buttonStyle" onClick={handlePageClick(page)} type="button">
            {page}
          </button>
        </li>
      ))}
      <li>
        <button className="arrowIconStyle" onClick={handlePageClick(currentPage + 1)} type="button">
          <IoIosArrowForward />
        </button>
      </li>
      <li>
        <button className="arrowIconStyle" onClick={handlePageClick(totalPageCount)} type="button">
          <AiOutlineDoubleRight />
        </button>
      </li>
    </ul>
  );
};

export default Pagination;
