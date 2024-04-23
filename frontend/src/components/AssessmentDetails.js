import React , { useState, useEffect } from 'react';
import SimpleLineChart from './SimpleLineChart';

export default function AssessmentDetails() {
  const [selectedAssessment, setSelectedAssessment] = useState(0)
  const [assessmentInfo, setAssessmentInfo] = useState({})
  
  // fetch(`http://localhost:8080/assessments/${selectedAssessment}`)
  // .then(res => res.json())
  // .then(res => setAssessmentInfo(res))
 
    return (
      <div>
        <h1>Assessment Details</h1>

        <label>Name:</label>
        <p>{assessmentInfo.name}</p>
        <br />
        <label>Associated Satellite:</label>
        <br />
        <label>Date:</label>
        <p>{assessmentInfo.date}</p>
        <br />
        <label>Details:</label>
        <p>{assessmentInfo.details}</p>
        <br />
        <label>Owner:</label>
        <p>{assessmentInfo.owner}</p>
        <br />
        <label>Model File:</label>
        {/* <input type="file" name="model_file" onChange={handleFileChange} /> */}
        <br />
        <label>Simulation File:</label>
        {/* <input type="file" name="simulation_file" onChange={handleFileChange} /> */}

        <h4>Visual Magnitude</h4>
        <SimpleLineChart/>

      </div>

    );

};