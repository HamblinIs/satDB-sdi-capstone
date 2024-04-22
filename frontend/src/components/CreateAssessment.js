import React from 'react';
import { useState } from 'react';

export default function CreateAssessment() {
  const [assessment, setAssessment] = useState({
    name: '',
    satellites: [],
    date:'',
    details: '',
    owner: '',
    model_file: '', // todo: need to have an input for model files and simulation files
    simulation_file: '',
    misc_files: []
  });
  const [addFiles, setAddFiles] = useState([''])

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

  const addFile = () => {
    setAddFiles(...addFiles, 'another')

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
      <label>Details:
          <textarea name="details" value={assessment.details} onChange={handleChange} />
        </label>
        <br/>
      <label>Owner:
          <input type="text" name="owner" value={assessment.owner} onChange={handleChange} />
        </label>
        <br/>
        <label>Model File:
          <input type="file" name="model_file" onChange={handleFileChange} />
        </label>
        <br/>
          <button onClick={() => addFile}>Add File </button>
          {addFiles.map( item => {
            return (
            <>
            <input type="file" name="add_file" onChange={handleFileChange} />
            </>
            )})}
        <br/>
        <label>Simulation File:
          <input type="file" name="simulation_file" onChange={handleFileChange} />
        </label>
        <br/>
        <input type="submit" value="Submit" />
      
    </form>
    </div>
  );
}