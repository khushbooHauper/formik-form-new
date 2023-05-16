import React, { useState } from 'react';
import { debounce } from 'lodash';

function SearchFilter({ setPage, filter, setFilter }) {
  const [searchValue, setSearchValue] = useState(filter);

  const handleFilterChange = debounce((value) => {
    setFilter(value);
    setPage(1);
  }, 300); // debounce delay 

  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchValue(value);
    handleFilterChange(value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={searchValue}
        onChange={handleInputChange}
        className="searchfilter"
      />
    </div>
  );
}

export default SearchFilter;
