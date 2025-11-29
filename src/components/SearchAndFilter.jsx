// src/components/SearchAndFilter.jsx (CORRECTED)
import React, { useState } from 'react';

// Expects a prop: onFilterChange, which is a function to call 
// when any filter or search term updates.
const SearchAndFilter = ({ onFilterChange }) => { 
  
  // State to hold all filter values
  const [filters, setFilters] = useState({
    searchTerm: '',
    category: '',
    audience: ''
  });

  // Generic handler to update state and notify the parent
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // 1. Update local state
    const newFilters = { 
        ...filters, 
        [name]: value 
    };
    setFilters(newFilters);
    
    // 2. Notify the parent component of the change
    onFilterChange(newFilters); 
  };

  return (
    <div className="filter-bar">
      {/* Search Input (Now Controlled) */}
      <div className="search-input-wrapper">
        <span className="search-icon">🔍</span>
        <input 
          type="text" 
          name="searchTerm" // Added name prop
          placeholder="Search for workshops..." 
          className="search-input" 
          value={filters.searchTerm} // Added value prop
          onChange={handleChange} // Added onChange handler
        />
      </div>
      
      {/* Category Dropdown (Now Controlled) */}
      <div className="dropdown-wrapper">
        <select 
          name="category" // Added name prop
          className="dropdown-select"
          value={filters.category} // Added value prop
          onChange={handleChange} // Added onChange handler
        >
          <option value="">All Categories</option>
          <option value="Technology">Technology</option>
          <option value="Arts">Arts</option>
          <option value="Marketing">Marketing</option>
        </select>
      </div>

      {/* Audience Dropdown (Now Controlled) */}
      <div className="dropdown-wrapper">
        <select 
          name="audience" // Added name prop
          className="dropdown-select"
          value={filters.audience} // Added value prop
          onChange={handleChange} // Added onChange handler
        >
          <option value="">All Audiences</option>
          <option value="Professionals">Professionals</option>
          <option value="Beginners">Beginners</option>
          <option value="Students">Students</option>
        </select>
      </div>
    </div>
  );
};

export default SearchAndFilter;