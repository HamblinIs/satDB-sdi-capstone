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
    model_file: '',
    simulation_file: '',
    misc_files: ''
  });

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
          model_file: assessment.model_file,
          simulation_file: assessment.simulation_file,
          misc_files: assessment.misc_files
        })
      })
      .then(res => res.json())
      .then(res => navigate(`/AssessmentDetails/${res.id}`));
    } catch (error) {
      console.error('Failed to add assessment:', error);
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

        <label>Model File:
          <input type="text" name="model_file" value={assessment.model_file} onChange={handleChange} />
        </label>
        <br/>

        <label>Simulation File:
        <input type="text" name="simulation_file" value={assessment.simulation_file} onChange={handleChange} />
        </label>
        <br/>

        <label>Misc File:
        <input type="text" name="misc_files" value={assessment.misc_files} onChange={handleChange} />
        </label>
        <br/>

        <button onClick = {() => handleSubmit()}>Submit</button>
      </>
    </div>
  );
}


