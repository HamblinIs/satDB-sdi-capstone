import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateNewSatellite.css'
import FilesListViewer from '../FilesListViewer';



export default function CreateNewSatellite () {

  const [satellite, setSatellite] = useState({
    name: '',
    images: [],
    owner: '',
    tailNumber: 0,
    orbitalRegime: '',
    // details: '',
    created_by: [{id: 1, name:''}],
    model_file: [], // todo: need to have an input for model files and simulation files
  });
  const [modelFile, setModelFile] = useState([]);
  const [cadModelFile, setCadModelFile] = useState([]);
  const [addCadModelFile, setAddCadModelFile] = useState(false);
  const [addImageFile, setAddImageFile] = useState(false);
  const [images, setImages] = useState([]);
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
          cad_model_files: cadModelFile,
          images: images
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

<>

<div className='assessment-container'>
<button onClick={() => navigate('../')}>Back</button>
  <h1 className='create-satellite-text roboto-regular'>Create Satellite</h1>
      <>
        <label>Name
          <input className='searchbar3' type="text" name="name" value={satellite.name} onChange={handleChange} />
        </label>
        <br/>
        <label>Tail Number
          <input className='searchbar3' type="text" name="tailNumber" value={satellite.tailNumber} onChange={handleChange} />
        </label>
        <br/>
        <label>Satellite Owner
          <input className='searchbar3' type="text" name="owner" value={satellite.owner} onChange={handleChange} />
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
          <FilesListViewer state={satellite} setState={setSatellite} fileType="model_file" isEditing={true} />
        </label>

        <br />

        <label>Image Files:
          <FilesListViewer state={satellite} setState={setSatellite} fileType="images" isEditing={true} />
        </label>

        <br />
        <br/>
        <button onClick = {() => handleSubmit()}>Submit</button>
      </>
    </div>



</>

  )
}