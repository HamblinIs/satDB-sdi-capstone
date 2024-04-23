import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CreateAssessment() {
  const navigate = useNavigate();
  const [assessmentId, setAssessmentId] = useState();
  const[satellite, setSatellite] = useState('');
  const [assessment, setAssessment] = useState({
    name: '',
    // satellites: [],
    creation_date:'',
    description: '',
    // owner: '',
    // model_file: '', // todo: need to have an input for model files and simulation files
    // simulation_file: '',
    // misc_files: []
  });
  const [modFiles, setModFiles] = useState();
  const [simFiles, setSimFiles] = useState();
  const modelCounter = [];
  const simCounter = [];

  const handleChange = (e) => {
    // name is the key name
    // value is e.target.value
    const { name, value } = e.target;
    setAssessment(prevState => ({ ...prevState, [name]: value }));
  };

  const handleFileChange = (e) => {
    // setAssessment(prevState => ({ ...prevState, file: e.target.files[0] }));
  };

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
          creation_date: assessment.creation_date,
          description: assessment.description
        })
      })
        // .then(response => {
        //   console.log(response)
        // })
        // .then(async (res) => {
        //   if (res.status === 201) {
        //     window.confirm("Assmen has been created!")
        //     // navigate(`/AssessmentDetails/${res.id}`)
        //   } else {
        //     alert("There was an error creating the assessment");
        //   }
        // })
        .then(res => res.json())
        .then(res => {
          console.log(res);
          setAssessmentId(res.id);
          navigate(`/AssessmentDetails/${res.id}`);
        });
    } catch (error) {
      console.error('Failed to add assessment:', error);
    }
  }


  const setModelFilesNum = () =>{
  //     const amount = document.getElementById("modelFilesNum").value

  //     for(let i=1; i<amount; i++){
  //       modelCounter.push(<>
  //         <label>Model File:
  //           <input type="file" name="model_file" onChange={handleFileChange} />
  //         </label>
  //         <br/>
  //         </>)
  //     }
  //     console.log("counter", modelCounter)
  //     setModFiles(modelCounter)
  }

  const setSimFilesNum = () => {
  //   const amount = document.getElementById("simFilesNum").value


  //   for(let i=1; i<amount; i++ ){
  //     simCounter.push(
  //       <>
  //       <label>Simulation File:
  //           <input type="file" name="simulation_file" onChange={handleFileChange} />
  //         </label>
  //         <br/>
  //       </>
  //     )
  //   }
  //   console.log("counter", simCounter)
  //   setSimFiles(simCounter)
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
        <input type="text" name="associatedSat" value={assessment.associatedSat} onChange={handleChange} />
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
      <label>Owner:
          <input type="text" name="owner" value={assessment.owner} onChange={handleChange} />
        </label>
        <br/>
        <label># of Model Files
        <select id = "modelFilesNum" name="modelFilesNum"  onChange={() => setModelFilesNum()}>
            <option value="">--Please choose an option--</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
          </label>
          <br />
          {modFiles === undefined ?
          <></>
          :
          <>
          <label>Model File:
          <input type="file" name="model_file" onChange={handleFileChange} />
        </label>
        <br/>
          {modFiles.map( item =>  item)}
        <br/>
        </>
        }
        <label># of Simulation Files
        <select id = "simFilesNum" name="simFilesNum"  onChange={() => setSimFilesNum()}>
            <option value="">--Please choose an option--</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
          </label>
          <br />
          {simFiles === undefined ?
          <></>
          :
          <>
          <label>Simulation File:
          <input type="file" name="model_file" onChange={handleFileChange} />
        </label>
        <br/>
          {simFiles.map( item =>  item)}
        <br/>
        </>
        }

        <button onClick = {() => handleSubmit()}>Submit</button>

    </>
    </div>
  );
}


