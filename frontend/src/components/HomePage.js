import React , { useState } from 'react';
import ImageViewer from './ImageViewer';
import styled from 'styled-components'
// const images = require.context('C:\Users\isaac\OneDrive\Pictures\AI_Generated', true);
// const imageList = images.keys().map(image => images(image));

const imageUrl = "https://mir-s3-cdn-cf.behance.net/project_modules/disp/9e715d17935609.562c11d9e3832.gif"


// const divStyle = {
//   backgroundImage: `url(${imageUrl})`,
//   backgroundSize: 'cover',
//   backgroundPosition: 'center',
//   height: '100vh',
//   width: '100%',
//   backgroundColor: `rgba(255, 255, 255, 0.2)`
// };


const StyledButton = styled.button`
    display: flex;
    justify-content:center;
    justify-items:center;
    align-items:center;
    align-content:center;
    color: black;
    border-radius: 3px;
    border: 2px solid black;
    background-color: #96a6ef;
    width: 100px;
    height: 35px;
`


export default function HomePage() {
  const imagesArr=["https://cdn.defenseone.com/media/img/cd/2023/08/11/GettyImages_1407240226/open-graph.jpg", "https://spaceplace.nasa.gov/satellite/en/TEMPO.en.jpg", "https://media.istockphoto.com/id/1339097795/photo/satellite-orbiting-the-earth.jpg?s=612x612&w=0&k=20&c=FMG2NypIT0JuZVs26qSYOq2qTwsO89woydrwZimK21s="];


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


      {/* <h1>Satellite Assessment Center</h1> */}

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
          placeholder='Search here for name'
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

      {sortedItems.length > 0 ?

        <div style={{ margin: "0 auto", display: "block", width: "80vw" }}>
          <input type="text" value={filterText} placeholder="Filter" onChange={(e) => setFilterText(e.target.value)} />

          <table style={{ border: '1px solid black' }}>
            <thead>
              <tr>
                {Object.keys(sortedItems[0]).map((header, index) => (
                  <th key={index}><button onClick={() => handleSort2(header)}>{header}</button></th>
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
        </div>

        : null
      }




      <div>
        <StyledButton onClick={() => handleAddSatellite()}>Add Satellite</StyledButton>
        <StyledButton onClick={() => handleAddAssessment()}>Add Assessment</StyledButton>
      </div>

          {/* {imageList.map((image, index) => (
        <img key={index} src={image} alt={`image-${index}`} />
      ))} */}

      <ImageViewer images={imagesArr}/>

          {/* <img src="C:\Users\isaac\OneDrive\Pictures\AI Generated\pilot cat.png" alt='cat'/>
          <img src="/layers.png" alt='sat'/>
          <img src="/satellie.jpg" alt="img"/>
          <img src="https://cdn.defenseone.com/media/img/cd/2023/08/11/GettyImages_1407240226/open-graph.jpg" alt="web picture" /> */}

    </div>
  );
};

