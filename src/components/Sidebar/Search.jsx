import React from 'react';
import { AiOutlineSearch as SearchIcon } from 'react-icons/ai';

export default function Search() {
  return (
    <div className="search">
      <div className="search__container">
        <SearchIcon className="search__icon" />
        <input type="text" className="search__input" placeholder="Search..." />
      </div>
    </div>
  );
}
