import React, { useState, useRef, useEffect } from 'react';

import { AiOutlineCaretDown } from 'react-icons/ai';
import c from 'classnames';
import '../styles/components/Filter.scss';

const FilterDropDown = ({ dropMenu, handleDropDown, title, filter }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const dropRef = useRef(null);

  const handleShowDropBox = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // 밖 영역 클릭시 드롭다운 닫힘
  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      const { current } = dropRef;

      if (isMenuOpen && current && !current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', checkIfClickedOutside);
    return () => {
      document.removeEventListener('mousedown', checkIfClickedOutside);
    };
  }, [isMenuOpen]);

  return (
    <div className="DropWrap" ref={dropRef}>
      <button className="DropText" type="button" onClick={handleShowDropBox}>
        {filter[title] ? filter[title] : '선택해주세요'}
        <AiOutlineCaretDown />
      </button>
      <ul className={c('DropMenu', { show: isMenuOpen })}>
        {dropMenu.map((el, index) => (
          <button
            className="DropList"
            key={index}
            onClick={() => {
              handleDropDown(title, el)();
              handleShowDropBox();
            }}
            type="button"
          >
            {el}
          </button>
        ))}
      </ul>
    </div>
  );
};

export default FilterDropDown;
