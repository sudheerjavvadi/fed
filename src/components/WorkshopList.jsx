// src/components/WorkshopList.jsx (CORRECTED)
import React, { useState, useMemo, useEffect } from 'react'; // Import necessary hooks
import WorkshopCard from './WorkshopCard';
import SearchAndFilter from './SearchAndFilter'; 
import workshopsData from '../data/workshops'; // The data you uploaded

const WorkshopList = () => {
  // 1. State to manage the active filters
  const [filters, setFilters] = useState({
    searchTerm: '',
    category: '',
    audience: ''
  });

  const [allWorkshops, setAllWorkshops] = useState(workshopsData);

  // Load custom workshops from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem('customWorkshops');
      if (raw) {
        const customWorkshops = JSON.parse(raw);
        setAllWorkshops([...workshopsData, ...customWorkshops]);
      }
    } catch (err) {
      console.error('Error loading custom workshops', err);
    }
  }, []);

  // 2. Function to update the filters state (passed to SearchAndFilter)
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };
  
  // 3. Memoize the filtered list for performance
  const filteredWorkshops = useMemo(() => {
    const searchLower = filters.searchTerm.toLowerCase();
    
    return allWorkshops.filter(workshop => {
      // Filter by Search Term (Title or Instructor Name)
      const matchesSearch = 
        !searchLower ||
        workshop.title.toLowerCase().includes(searchLower) ||
        workshop.instructorName.toLowerCase().includes(searchLower);

      // Filter by Category
      const matchesCategory = 
        !filters.category || 
        workshop.topic === filters.category; 

      // Filter by Audience
      const matchesAudience = 
        !filters.audience || 
        workshop.audience === filters.audience;

      return matchesSearch && matchesCategory && matchesAudience;
    });
  }, [filters]); // Re-run the filter whenever the filters state changes

  return (
    <>
      {/* 4. Render the search and filter component with the handler */}
      <SearchAndFilter onFilterChange={handleFilterChange} /> 

      <div className="workshop-list-container">
        {filteredWorkshops.length > 0 ? (
          filteredWorkshops.map((workshop) => (
            <WorkshopCard key={workshop.id} workshop={workshop} />
          ))
        ) : (
          // Display a message if no workshops match the filters
          <p className="no-results-message">
            No workshops found matching your criteria. Try adjusting your filters.
          </p>
        )}
      </div>
    </>
  );
};

export default WorkshopList;