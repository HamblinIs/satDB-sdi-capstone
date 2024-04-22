import React from 'react';
import { useState } from 'react';

export default function CreateAssessment() {
  const [assessment, setAssessment] = useState({
    name: '',
    satellites: [],
    date:'',
    // details: '',
    owner: '',
    model_file: '', // todo: need to have an input for model files and simulation files
    simulation_file: '',
    misc_files: []
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
    setAssessment(prevState => ({ ...prevState, file: e.target.files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // todo: send a POST request to the assessments table
    console.log(assessment);
  };

const setModelFilesNum = () =>{
    const amount = document.getElementById("modelFilesNum").value

    for(let i=1; i<amount; i++){
      modelCounter.push(<>
        <label>Model File:
          <input type="file" name="model_file" onChange={handleFileChange} />
        </label>
        <br/>
        </>)
    }
    console.log("counter", modelCounter)
    setModFiles(modelCounter)
}

const setSimFilesNum = () => {
  const amount = document.getElementById("simFilesNum").value


  for(let i=1; i<amount; i++ ){
    simCounter.push(
      <>
      <label>Simulation File:
          <input type="file" name="simulation_file" onChange={handleFileChange} />
        </label>
        <br/>
      </>
    )
  }
  console.log("counter", simCounter)
  setSimFiles(simCounter)
}

  return (
    <div>
      <h1>Create Assessment</h1>

      <form onSubmit={handleSubmit}>
      <label>Name:
          <input type="text" name="name" value={assessment.name} onChange={handleChange} />
        </label>
        <br/>

      <label>Associated Satellite:
        </label>
      <label>Date:
          <input type="date" name="date" value={assessment.date} onChange={handleChange} />
        </label>
        <br/>
      {/* <label>Details:
          <textarea name="details" value={assessment.details} onChange={handleChange} />
        </label>
        <br/> */}
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
          
        <input type="submit" value="Submit" />
      
    </form>
    </div>
  );
}