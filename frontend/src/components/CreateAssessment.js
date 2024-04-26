import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CreateAssessment() {
  const navigate = useNavigate();
  const[satellite, setSatellite] = useState('');
  const [associatedSatList, setAssociatedSatList] = useState([]);
  const [assessment, setAssessment] = useState({
    name: '',
    associatedSat: 0,
    creation_date:'',
    description: '',
  });
  const [modelFile, setModelFile] = useState([]);
  const [simulationFile, setSimulationFile] = useState([]);
  const [miscFile, setMiscFile] = useState([]);
  const [addSimFile, setAddSimFile] = useState(false);
  const [addMiscFile, setAddMiscFile] = useState(false);
  const [addDataFile, setAddDataFile] = useState(false);
  const [addImageFile, setAddImageFile] = useState(false);
  const [images, setImages] = useState([]);
  const [dataFile, setDataFile] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAssessment(prevState => ({ ...prevState, [name]: value }));
  };

  useEffect(() => {
  const satList = async () =>{
    try {
      await fetch('http://localhost:8080/satellites?name')
      .then(response => response.json())
      .then(data => {
        setAssociatedSatList(data)
      })
    } catch (error) {
      console.error('Failed to add assessment:', error);
    }
  }
  satList();
  }, [])

  const handleSubmit = () => {
    // e.preventDefault();
    try {
      fetch('http://localhost:8080/assessment/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: assessment.name,
          associatedSat: assessment.associatedSat,
          creation_date: assessment.creation_date,
          description: assessment.description,
          //model_file: modelFile,
          sim_files: simulationFile,
          misc_files: miscFile,
          data_files: dataFile,
          images: images
        })
      })
      .then(res => res.json())
      .then(res => navigate(`/AssessmentDetails/${res.id}`));
    } catch (error) {
      console.error('Failed to add assessment:', error);
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
    <div>
      <h1>Create Assessment</h1>
      <>
        <label>Name:
          <input type="text" name="name" value={assessment.name} onChange={handleChange} />
        </label>
        <br/>

        <label>Associated Satellite:
          <select id="associatedSat" name="associatedSat" value={assessment.associatedSat}  onChange={handleChange}>
            <option value="">--Please choose an option--</option>
            {associatedSatList.map(sat =>
              <option key={sat.tail_num} value={sat.id}>{`${sat.name}, Tail #: ${sat.tail_num}`}</option>
            )}
              <option value="N/A">No Associated Satellites</option>
          </select>
        </label>
        <br/>

        <label>Date:
          <input type="date" name="creation_date" value={assessment.creation_date} onChange={handleChange} />
        </label>
        <br/>

        <label>Description:
          <textarea name="description" value={assessment.description} onChange={handleChange} />
        </label>
        <br/>

        <label>Simulation File:
          <ul>
            {simulationFile.map((file, index) => (
              <li key={index}>{file.file_path_name}</li>
            ))}
          </ul>
          {addSimFile ? (
            <>
              <input
                type="text"
                name="sim_file"
                id="sim_file"
                />
              <button  onClick = {() => addFileToState('sim_file', setSimulationFile)}>Save</button>
            </>
          ): (
            <>
              <label>No File Chosen</label>
              <br/>
              <button type="button" onClick={() => setAddSimFile(!addSimFile)}>ADD A FILE</button>
            </>
          ) }
        </label>
        <br/>
        <br/>
        <br/>
        <label>Misc File:
          <ul>
            {miscFile.map((file, index) => (
              <li key={index}>{file.file_path_name}</li>
            ))}
          </ul>
          {addMiscFile ? (
            <>
              <input
                type="text"
                name="misc_file"
                id="misc_file"
                />
              <button  onClick = {() => addFileToState('misc_file', setMiscFile)}>Save</button>
            </>
          ): (
            <>
              <label>No File Chosen</label>
              <br/>
              <button type="button" onClick={() => setAddMiscFile(!addMiscFile)}>ADD A FILE</button>
            </>
          ) }
        </label>
        <br/>
        <br/>
        <br/>
        <label>Data File:
          <ul>
            {dataFile.map((file, index) => (
              <li key={index}>{file.file_path_name}</li>
            ))}
          </ul>
          {addDataFile ? (
            <>
              <input
                type="text"
                name="data_file"
                id="data_file"
                />
              <button  onClick = {() => addFileToState('data_file', setDataFile)}>Save</button>
            </>
          ): (
            <>
              <label>No File Chosen</label>
              <br/>
              <button type="button" onClick={() => setAddDataFile(!addDataFile)}>ADD A FILE</button>
            </>
          ) }
        </label>
        <br/>
        <br/>
        <br/>
        <label>Image File:
          <ul>
            {images.map((file, index) => (
              <li key={index}>{file.file_path_name}</li>
            ))}
          </ul>
          {addImageFile ? (
            <>
              <input
                type="text"
                name="image_file"
                id="image_file"
                />
              <button  onClick = {() => addFileToState('image_file', setImages)}>Save</button>
            </>
          ): (
            <>
              <label>No File Chosen</label>
              <br/>
              <button type="button" onClick={() => setAddImageFile(!addImageFile)}>ADD A FILE</button>
            </>
          ) }
        </label>
        <br/>
        <br/>
        <button onClick = {() => handleSubmit()}>Submit</button>
      </>
    </div>
  );
}


