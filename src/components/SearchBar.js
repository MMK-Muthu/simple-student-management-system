import React from 'react';

const SearchBar = ({ searchTerm, onSearchChange, filterBy, onFilterChange }) => {
  return (
    <div className="search-bar">
      <div className="search-input-wrapper">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          className="search-input"
          placeholder="Search students..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        {searchTerm && (
          <button 
            className="clear-search" 
            onClick={() => onSearchChange('')}
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>
      <div className="filter-wrapper">
        <label className="filter-label">Filter by:</label>
        <select 
          className="filter-select"
          value={filterBy}
          onChange={(e) => onFilterChange(e.target.value)}
        >
          <option value="all">All Fields</option>
          <option value="name">Name</option>
          <option value="course">Course</option>
        </select>
      </div>
    </div>
  );
};

export default SearchBar;

