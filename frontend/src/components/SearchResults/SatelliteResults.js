import React , { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import ImageViewer from './ImageViewer';
import styled from 'styled-components'
import './SatelliteResults.css'




const imageUrl = "https://mir-s3-cdn-cf.behance.net/project_modules/disp/9e715d17935609.562c11d9e3832.gif"

export default function SatelliteResults( { category, searchTerm } ) {


  const navigate = useNavigate();
  const [sortOrder, setSortOrder] =  useState('desending')
  const [queryData, setAllQueryData] = useState([]);

  useEffect(() => {
    if (category === "satellites") {
      fetch(`http://localhost:8080/satellites?name=${searchTerm}`)
        .then((response) => response.json())
        .then((data) => {
          const addLink = data.map((item) => {
            item.view = (
              <button
                onClick={() => {
                  navigate(`../SatelliteDetails/${item.id}`);
                }}
              >
                Details
              </button>
            );
            return item;
          });
          setAllQueryData(addLink);
        });
    } else if (category === "assessments") {
      fetch(`http://localhost:8080/assessments?name=${searchTerm}`)
        .then((response) => response.json())
        .then((data) => {
          var addLink = data.map((item) => {
            item.view = (
              <button
                onClick={() => {
                  navigate(`../AssessmentDetails/${item.id}`);
                }}
              >
                Details
              </button>
            );
            item.creation_date = item.creation_date.slice(0, 10);
            return item;
          });
          setAllQueryData(addLink);
        });
    }
    console.log("testing", queryData);
  }, [searchTerm, category]);






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
    <CenterDiv>
      {/* <SearchDiv>

        <h3>Search for:
          <div onChange={chooseCategory}>
            <label>
              <input type="radio" value="satellites" name="search_category" /> Satellites
            </label>
            <label>
              <input type="radio" value="assessments" name="search_category" /> Assessments
            </label>
          </div>
        </h3>
        <br />

        <StyledInput
          type='text'
          placeholder='Insert name or click Search for all results'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <StyledButton onClick={() => handleSearch()}>Search</StyledButton>
      </SearchDiv> */}
      {sortedItems.length > 0 ?
        <div style={{ margin: "0 auto", display: "block" }}>



          <div className='results-container' >
          <h1 className='result-header'>
              {category === 'satellites' ? 'Satellites' : 'Assessments'}
            </h1>
          <table style={{ border: '1px solid black' }}>

            <thead>

              <tr >
              {/* <h1>1</h1> */}
                {Object.keys(sortedItems[0]).map((header, index) => (
                  <th key={index}><button onClick={() => handleSort2(header)}>{header.toUpperCase()}</button></th>
                  // <th key={index} className="purple-header">{header.toUpperCase()}</th>
                ))}
                  {/* <h1>h2</h1> */}
              </tr>
            </thead>
            <tbody>
            {/* <h1>h3</h1> */}
              {sortedItems.map((row, index) => (
                <tr key={index}>
                  {Object.keys(sortedItems[0]).map((header, i) => (
                    <td key={i}>{row[header]}</td>

                  ))}
                </tr>
              ))}
               {/* <h1>h4</h1> */}
            </tbody>
          </table>
          </div>


        </div>
        : null
      }

    </CenterDiv>
  );
};



const CenterDiv = styled.div`
display: flex;
flex-flow: column;
justify-content: center;
justify-items: center;
align-items: center;
align-content: center;
`

const SearchDiv = styled.div`
display: flex;
flex-flow: column;
justify-content: center;
justify-items: center;
align-items: center;
align-content: center;
background-color: #c4cfff;
border: 4px solid #4a478a;
margin-top: 20px;
padding: 40px;
gap: 5px;
`

const BackgroundDiv = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  justify-items: center;
  align-items: center;
  align-content: center;
  background-color: #c4cfff;
  border: 4px solid #4a478a;
  margin-top: 20px;
  padding: 20px;
`

const StyledButton = styled.button`
    justify-content:center;
    justify-items:center;
    align-items:center;
    align-content:center;
    color: #081448;
    border-radius: 3px;
    border: 2px solid black;
    background-color: #96a6ef;
    width: 125px;
    height: 35px;
    font-weight: bold;
`

const FilterButton = styled.button`
justify-content:center;
justify-items:center;
align-items:center;
align-content:center;
color: white;
border-radius: 3px;
border: 2px solid black;
background-color: #1a2c80;
width: 125px;
height: 25px;
`
const DetailsButton = styled.button`
justify-content:center;
justify-items:center;
align-items:center;
align-content:center;
color: #081448;
border-radius: 3px;
border: 2px solid black;
background-color: #96a6ef;
width: 90px;
height: 25px;
`

const StyledInput = styled.input`
  height: 35px;
  width: 250px;
  border-radius: 3px;
  border: 2px solid black;
  background-color: white;
`

const StyledSelect = styled.select`
  height: 35px;
  border-radius: 3px;
    border: 2px solid black;
    background-color: #96a6ef;
`