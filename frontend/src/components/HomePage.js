import React , { useState } from 'react';

export default function HomePage() {

  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] =  useState('desending')
  const [category, setCategory] = useState('')
  const [allData, setAllData] = useState([]);
  const [queryData, setAllQueryData] = useState([]);

  const handleSearch = () => {
    if(category === 'satellites'){
      fetch(`http://localhost:3000/satellites`)
      .then(response => response.json())
      .then(data => setAllData(data))
    }
    else if(category === 'assessments'){
      fetch(`http://localhost:3000/assessments`)
      .then(response => response.json())
      .then(data => setAllData(data))
    }

    setAllQueryData(allData.filter(item => item.name.includes(searchTerm)))
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

const chooseCategory = () => {
  setCategory(document.getElementById("search_category").value)
}


  // FILTER FEATURES
  const [filter, setFilter] = useState('all');
  const [filterText, setFilterText] = useState('');
  const handleFilterChange = (event) => {
    setFilterText(event.target.value);
  };
  // filter using "My Inventory" button
  let items = []; // delete this
  let filteredItems = filter === 'all' ? items : items.filter(item => item.user_id === item.user_id);

  // filter again based on textfield input
  filteredItems = filteredItems.filter(item =>
    item.item_id.toString().includes(filterText.toLowerCase()) ||
    item.username.toLowerCase().includes(filterText.toLowerCase()) ||
    item.item_name.toLowerCase().includes(filterText.toLowerCase()) ||
    item.description.toLowerCase().includes(filterText.toLowerCase())
  );


  // SORT FEATURES
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const handleSort2 = (field) => {
    const newDirection = sortField === field && sortDirection === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortDirection(newDirection);
  };

  // then sort mutation based on filteredItems
  const sortedItems = [...filteredItems].sort((a, b) => {
    if (a[sortField] < b[sortField]) {
      return sortDirection === 'asc' ? -1 : 1;
    }
    if (a[sortField] > b[sortField]) {
      return sortDirection === 'asc' ? 1 : -1;
    }
    return 0;
  });



  return (
    <div>

      <h1>Satellite Assessment Center</h1>

      <div>

        <label>Search for
          <select id='search_category' name="search_category" onChange={() => chooseCategory()}>
            <option value="">--Please choose an option--</option>
            <option value="satellites">Satellites</option>
            <option value="assessments">Assessments</option>
          </select>
        </label>

        <br />

        <input 
          type='text'
          placeholder='Search here'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
        <button onClick={handleSort}>Sort</button>

      </div>




      <div>
        <ul>
          {queryData.map( item => {
            return(
              <li>
                <p>{item.name}</p>
              </li>            
              )
          })}
        </ul>
      </div>



      <div>
        <button onClick={handleAddSatellite}>Add Satellite</button>
        <button onClick={handleAddAssessment}>Add Assessment</button>
      </div>

    </div>
  );
}
