import React , { useState } from 'react';
import {useNavigate} from 'react-router-dom';

// const images = require.context('C:\Users\isaac\OneDrive\Pictures\AI_Generated', true);
// const imageList = images.keys().map(image => images(image));

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
          item.link = <button onClick = {() => {
            if(category === 'satellites'){
              navigate(`/SatelliteDetails/${item.id}`);
            }
            else if(category === 'assessments'){
              navigate(`/AssessmentDetails/${item.id}`);
            }
          }}>Details</button>
    
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
          item.link = <button onClick = {() => {
            if(category === 'satellites'){
              navigate(`/SatelliteDetails/${item.id}`);
            }
            else if(category === 'assessments'){
              navigate(`/AssessmentDetails/${item.id}`);
            }
          }}>Details</button>
    
          return (item)
        }) 
        setAllQueryData(addLink)
      })
    }

    // setAllQueryData(prevState => ([..prevState, ["name"]: <button>{prevState.name}</button> })];
    
    console.log("testing", queryData)
    
  
  }
 
  const handleSort = () => {
    // Toggle sort 
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newSortOrder);
  }

  const handleAddSatellite = () => {
    navigate('/CreateSatellite')
  }

  const handleAddAssessment = () => {
    navigate('/CreateAssessment')
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

// it returns string
// its stored in queryData.name
// we want to modify queryData.name to return <button></button>
// queryData = {
  // name: `<button></button>`
// }


  
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
          placeholder='Search here for name'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={() => handleSearch()}>Search</button>
        <button onClick={() => handleSort()}>Sort</button>

      </div>






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
        </div>

        : null
      }
      



      <div>
        <button onClick={() => handleAddSatellite()}>Add Satellite</button>
        <button onClick={() => handleAddAssessment()}>Add Assessment</button>
      </div>

          {/* {imageList.map((image, index) => (
        <img key={index} src={image} alt={`image-${index}`} />
      ))} */}
      
      
          {/* <img src="C:\Users\isaac\OneDrive\Pictures\AI Generated\pilot cat.png" alt='cat'/>
          <img src="/layers.png" alt='sat'/>
          <img src="/satellie.jpg" alt="img"/>
          <img src="https://cdn.defenseone.com/media/img/cd/2023/08/11/GettyImages_1407240226/open-graph.jpg" alt="web picture" /> */}
    </div>
  );
};


