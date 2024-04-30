import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FilesListViewer from './FilesListViewer';
import styled from 'styled-components';

const BackgroundDiv = styled.div`
display: flex;
flex-flow: column;
justify-content: center;
justify-items: center;
align-items: center;
align-content: center;
background-color: #c4cfff;
width: 500px;
margin-left: 35%;
border: 4px solid #4a478a;
margin-top: 20px;
padding: 20px;
`

export default function CreateSatellite() {
  const [satellite, setSatellite] = useState({
    name: '',
    images: [],
    owner: '',
    tailNumber: 0,
    orbitalRegime: '',
    // details: '',
    created_by: [{id: 1, name:''}],
    cad_model_files: [], // todo: need to have an input for model files and simulation files
    images: [],
  });

  const navigate = useNavigate();


  const handleChange = (e) => {
    // name is the key name
    // value is e.target.value
    const { name, value } = e.target;
    setSatellite(prevState => ({ ...prevState, [name]: value }));
  };

  const handleFileChange = (e) => {
    setSatellite(prevState => ({ ...prevState, file: e.target.files[0] }));
  };

  const handleSubmit = (e) => {

    try {
      fetch ('http://localhost:8080/satellite/new', {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json'
        },

        body: JSON.stringify({
          name: satellite.name,
          orbit: satellite.orbitalRegime,
          owner: satellite.owner,
          tail_number: satellite.tailNumber,
          cad_model_files: satellite.cad_model_files,
          images: satellite.images
        })
      })
      .then(async (res) => {
        if (res.status === 200) {
          alert("There was an error creating the item");
        } else {
          window.confirm("Item has been created!");
          return res.json()
        }
      })
      .then(res => navigate(`/SatelliteDetails/${res.id}`));
    } catch(error) {
      console.error('Failed to add satellite:', error);
    }
  }

  const addFileToState = (file_type, setState) => {
    const fileInput = document.getElementById(file_type);
    const file = fileInput.value;
    if (file){
      setState(prevState => ([ ...prevState, {file_path_name: file} ]))
    }
  }

  return (
    <BackgroundDiv>
      <h1>Create Satellite</h1>
      <>
        <label>Name:
          <input type="text" name="name" value={satellite.name} onChange={handleChange} />
        </label>
        <br/>
        <label>Tail Number:
          <input type="text" name="tailNumber" value={satellite.tailNumber} onChange={handleChange} />
        </label>
        <br/>
        <label>Satellite Owner:
          <input type="text" name="owner" value={satellite.owner} onChange={handleChange} />
        </label>
        <br/>
        <label>Orbital Regime:
          <select name="orbitalRegime" value={satellite.orbitalRegime} onChange={handleChange}>
            <option value="">--Please choose an option--</option>
            <option value="LEO">Low Earth Orbit (LEO)</option>
            <option value="MEO">Medium Earth Orbit (MEO)</option>
            <option value="GEO">Geostationary Orbit (GEO)</option>
          </select>
        </label>
        <br/>
        <br />

        <label>CAD Models:
          <FilesListViewer state={satellite} setState={setSatellite} fileType="cad_model_files" isEditing={true} />
        </label>

        <br />

        <label>Image Files:
          <FilesListViewer state={satellite} setState={setSatellite} fileType="images" isEditing={true} />
        </label>

        <br />
        <br/>
        <button onClick = {() => handleSubmit()}>Submit</button>
      </>
    </BackgroundDiv>
  );
}
