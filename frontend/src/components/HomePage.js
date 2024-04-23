import React , { useState } from 'react';

export default function HomePage() {

  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] =  useState('desending')
  const [category, setCategory] = useState('')
  const [allData, setAllData] = useState([]);
  const [queryData, setAllQueryData] = useState([]);

  const handleSearch = () => {
    if(category === 'satellites'){
      fetch(`http://localhost:8080/satellites?name=${searchTerm}`)
      .then(response => response.json())
      .then(data => {
        console.log("data", data)
        setAllQueryData(data)
      })
    }
    else if(category === 'assessments'){
      fetch(`http://localhost:8080/assessments?name=${searchTerm}`)
      .then(response => response.json())
      .then(data => setAllQueryData(data))
    }
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

  // filter based on textfield input
  let filteredItems = [];
  if (category === 'satellites') {
    filteredItems = queryData.filter(item =>
      item.id.toString().includes(filterText.toLowerCase()) ||
      item.name.toLowerCase().includes(filterText.toLowerCase()) ||
      item.tail_num.toString().includes(filterText.toLowerCase())
    )
  } else if (category === 'assessments') {
    filteredItems = queryData.filter(item =>
      item.id.toString().includes(filterText.toLowerCase()) ||
      item.name.toLowerCase().includes(filterText.toLowerCase()) ||
      item.description.toLowerCase().includes(filterText.toLowerCase()) ||
      item.creation_date.toString().includes(filterText.toLowerCase())
    )
  }


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
        <button onClick={() => handleSearch()}>Search</button>
        <button onClick={() => handleSort()}>Sort</button>

      </div>




      {/* <div>
        <ul>
          {queryData.map(item => {
            return (
              <li>
                <p>{item.name}</p>
              </li>
            )
          })}
        </ul>
      </div> */}


      <div style={{ margin: "0 auto", display: "block", width: "80vw" }}>
        <input type="text" value={filterText} placeholder="Filter" onChange={(e) => setFilterText(e.target.value)} />

        {sortedItems.length > 0 ?
          <table style={{border: '1px solid black'}}>
            <thead>
              <tr>
                {Object.keys(sortedItems[0]).map((header, index) => (
                  <th key={index}><button onClick={()=>handleSort2(header)}>{header}</button></th>
                ))}
              </tr>
            </thead>

            <tbody>
              {sortedItems.map((row, index) => (
                <tr key={index}>
                  {Object.keys(sortedItems[0]).map((header, i) => (
                    <td key={i}>{row[header]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          : null
        }
      </div>



      <div>
        <button onClick={handleAddSatellite}>Add Satellite</button>
        <button onClick={handleAddAssessment}>Add Assessment</button>
      </div>

    </div>
  );
};

