import React, { useState } from 'react'

function SearchFilter({setPage,filter,setFilter}) {
   
    const handleFilterChange = (event) => {
        setFilter(event.target.value);
        setPage(1);
    };
    return (
        <div>
            <input
                type="text"
                placeholder="Search..."
                value={filter}
                onChange={handleFilterChange}
                className='searchfilter'
            />
        </div>
    )
}

export default SearchFilter
