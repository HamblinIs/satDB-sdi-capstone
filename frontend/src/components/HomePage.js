import React , { useState }from 'react';

export default function HomePage() {

  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] =  useState('desending')

  const handleSearch = () => {
    // Perform search
  }
 
  const handleSort = () => {
    // Toggle sort 
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newSortOrder);
  }

  const handleAddSatellite = () => {
    // Add new satellite with model or link to add satellite page
  }

  const handleAddAssessment = () => {
    // Add new assessment with model or link to add assessment page
  }


  return (
    <div>
      <h1>Satellite Assessment Center</h1>
      <div>
        <input 
          type='text'
          placeholder='Search here'
          value={searchTerm}
          onChange={() => setSearchTerm()}
        />
        <button onClick={handleSearch}>Search</button>
        <button onClick={handleSort}>Sort</button>
      </div>
      <div>
        <ul>
          <li>Some Satellite Details</li>
          <li>Some Satellite Details</li>
          <li>Some Satellite Details</li>
          <li>Some Satellite Details</li>
        </ul>
      </div>
      <div>
        <button onClick={handleAddSatellite}>Add Satellite</button>
        <button onClick={handleAddAssessment}>Add Assessment</button>
      </div>
    </div>
  );
}
