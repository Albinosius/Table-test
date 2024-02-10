import React, { useState } from 'react';

const SearchInput = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className='search'>
      <label>Найти по фамилии:</label>
      <div>
        <input type="text" value={searchTerm} onChange={handleInputChange} onKeyPress={handleKeyPress} />
        <button onClick={handleSearch}>Найти</button>
      </div>

    </div>
  );
};

export default SearchInput;