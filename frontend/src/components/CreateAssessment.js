import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import FilesListViewer from './FilesListViewer';

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
  const [assessmentInfo, setAssessmentInfo] = useState({sim_files: [], data_files: [], misc_files: [], images: []})

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
          data_files: assessmentInfo.data_files,
          sim_files: assessmentInfo.sim_files,
          misc_files: assessmentInfo.misc_files,
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
    <BackgroundDiv>
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

        <label>Data Files:
          <FilesListViewer state={assessmentInfo} setState={setAssessmentInfo} fileType="data_files" isEditing={true} />
        </label>

        <br />

        <label>Simulation Files:
          <FilesListViewer state={assessmentInfo} setState={setAssessmentInfo} fileType="sim_files" isEditing={true} />
        </label>

        <br />

        <label>Misc Files:
          <FilesListViewer state={assessmentInfo} setState={setAssessmentInfo} fileType="misc_files" isEditing={true} />
        </label>

        <br />

        <label>Images:
          <FilesListViewer state={assessmentInfo} setState={setAssessmentInfo} fileType="images" isEditing={true} />
        </label>

        <br/>
        <br/>
        <button onClick = {() => handleSubmit()}>Submit</button>
      </>
    </BackgroundDiv>
  );
}


