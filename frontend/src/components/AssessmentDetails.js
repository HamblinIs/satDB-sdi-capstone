import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SimpleLineChart from './SimpleLineChart';


export default function AssessmentDetails() {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedAssessment, setSelectedAssessment] = useState(0)
  const [assessmentInfo, setAssessmentInfo] = useState({})
  const assessmentId = useParams();

  useEffect(() => {
    // console.log("params id", assessmentId)
    fetch(`http://localhost:8080/assessments/${assessmentId.id}`)
      .then(res => res.json())
      .then(res => setAssessmentInfo(res))
  }, []);

  const handleSave = () => {
    // todo: need to add save logic: fetch with PATCH method
    console.log("save was clicked");
    handleToggleEdit();
  }

  const handleToggleEdit = () => {
    setIsEditing(!isEditing);
  };


  if (assessmentInfo) {

    return (
      <div>
        <h1>Assessment Details</h1>


        <label>Name:
          <input type='text' value={assessmentInfo.name} readOnly={!isEditing} />
        </label>

        <br />

        <label>Associated Satellite:</label>

        <br />

        <label>Creation Date:
          <input type='text' value={assessmentInfo.creation_date} readOnly={!isEditing} />
        </label>

        <br />

        <label>Description:
          <input type='text' value={assessmentInfo.description} readOnly={!isEditing} />
        </label>

        <br />

        <label>Owner:
          <input type='text' value={assessmentInfo.owner} readOnly={!isEditing} />
        </label>

        <br />

        <label>Model File:</label>

        {/* <input type="file" name="model_file" onChange={handleFileChange} /> */}
        
        <br />

        <label>Simulation File:</label>
        {/* <input type="file" name="simulation_file" onChange={handleFileChange} /> */}


        <br />
          
          <h4>Visual Magnitude</h4>
        <SimpleLineChart/>

        {isEditing ? (
          <button onClick={() => handleSave()}>Save</button>
        ) : (
          <button onClick={() => handleToggleEdit()}>Edit</button>
        )}

      </div>
    );
  }
}

