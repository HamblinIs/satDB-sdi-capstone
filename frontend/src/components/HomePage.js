import React , { useState } from 'react';
import {useNavigate} from 'react-router-dom';

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

export default function HomePage() {

  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] =  useState('desending')
  const [category, setCategory] = useState('')
  const [queryData, setAllQueryData] = useState([]);

  const handleSearch = () => {
    if(category === 'satellites'){
      fetch(`http://localhost:8080/satellites?name=${searchTerm}`)
      .then(response => response.json())
      .then(data => {
        const addLink = data.map(item => {
          item.view = <DetailsButton onClick = {() => {
              navigate(`../SatelliteDetails/${item.id}`);
          }}>Details</DetailsButton>

          return (item)
        })
        setAllQueryData(addLink)
      })
    }
    else if(category === 'assessments'){
      fetch(`http://localhost:8080/assessments?name=${searchTerm}`)
      .then(response => response.json())
      .then(data => {
        var addLink = data.map(item => {
          item.view = <DetailsButton onClick = {() => {
              navigate(`../AssessmentDetails/${item.id}`);
          }}>Details</DetailsButton>
          item.creation_date = item.creation_date.slice(0,10)
          return (item)
        })
        setAllQueryData(addLink)
      })
    }

    // setAllQueryData(prevState => ([..prevState, ["name"]: <button>{prevState.name}</button> })];

    console.log("testing", queryData)


  }


const chooseCategory = (e) => {
  // setCategory(document.getElementById("search_category").value);
  setCategory(e.target.value);
  // console.log(category);
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
    <CenterDiv>


      {/* <h1>Satellite Assessment Center</h1> */}

      <SearchDiv>

        <h3>Search for:
          {/* <select id='search_category' name="search_category" onChange={chooseCategory}>
            <option value="">--Please choose an option--</option>
            <option value="satellites">Satellites</option>
            <option value="assessments">Assessments</option>
          </select> */}
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

      </SearchDiv>






      {/*

      <TableBody>
        {sortedItems.map(item => (
          <TableRow key={item.item_id}>
            <TableCell>{item.item_id}</TableCell>
            <TableCell>{item.username}</TableCell>
            <TableCell>{<Button variant="contained" style={{ textTransform: "none" }} sx={{ color: 'white', backgroundColor: 'primary', borderColor: 'black' }} onClick={() => navigate(`/inventory/item/${item.item_id}`)}>{item.item_name}</Button>}</TableCell>
            <TableCell>{item.description.length > 100 ? `${item.description.substring(0, 100)}...` : item.description}</TableCell>
            <TableCell>{item.quantity}</TableCell>
            <TableCell>{user ? <Button variant="contained" sx={{ color: 'white', backgroundColor: 'red', borderColor: 'black' }} onClick={() => handleDelete(item)}><DeleteIcon /></Button> : null}</TableCell>
          </TableRow>
        ))}
      </TableBody>

      */}





      {sortedItems.length > 0 ?
        <div style={{ margin: "0 auto", display: "block" }}>
          {/* <input type="text" value={filterText} placeholder="Filter" onChange={(e) => setFilterText(e.target.value)} /> */}
          <BackgroundDiv>
          <table style={{ border: '1px solid black' }}>
            <thead>
              <tr>
                {Object.keys(sortedItems[0]).map((header, index) => (
                  <th key={index}><FilterButton onClick={() => handleSort2(header)}>{header.toUpperCase()}</FilterButton></th>
                ))}
              </tr>
            </thead>

            <tbody>
              {/* {sortedItems.map(item => (
                <tr key = {item.id}>
                  <td>{item.id}</td>
                  <td onClick = {() => {
                    if(category === 'satellites'){
                      navigate(`/SatelliteDetails/${item.id}`);
                    }
                    else if(category === 'assessments'){
                      navigate(`/AssessmentDetails/${item.id}`);
                    }
                  }}>{item.name}</td>
                  <td></td>
                </tr>

              )

              )} */}
              {sortedItems.map((row, index) => (
                <tr key={index}>
                  {Object.keys(sortedItems[0]).map((header, i) => (
                    <td key={i}>{row[header]}</td>





                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          </BackgroundDiv>

        </div>
        : null
      }





{/*
          {/* {imageList.map((image, index) => (
        <img key={index} src={image} alt={`image-${index}`} />
      ))} */}


          {/* <img src="C:\Users\isaac\OneDrive\Pictures\AI Generated\pilot cat.png" alt='cat'/>
          <img src="/layers.png" alt='sat'/>
          <img src="/satellie.jpg" alt="img"/>
          <img src="https://cdn.defenseone.com/media/img/cd/2023/08/11/GettyImages_1407240226/open-graph.jpg" alt="web picture" /> */}

    </CenterDiv>
  );
};


