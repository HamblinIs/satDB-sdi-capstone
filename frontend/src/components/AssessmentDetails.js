import React from 'react';

export default function AssessmentDetails() {
  return (
    <div>
      <h1>Assessment Details</h1>

      <label>Name:</label>
      {/* <p>{assessment.name}</p> */}
      <br/>
      <label>Associated Satellite:</label>
      <br/>
      <label>Date:</label>
      {/* <p>{assessment.date} onChange={handleChange}</p> */}
      <br/>
      <label>Details:</label>
      {/* <p>{assessment.details} onChange={handleChange}</p> */}
      <br/>
      <label>Owner:</label>
      {/* <p>{assessment.owner} onChange={handleChange}</p> */}
      <br/>
      <label>Model File:</label>
      {/* <input type="file" name="model_file" onChange={handleFileChange} /> */}
      <br/>
      <label>Simulation File:</label>
      {/* <input type="file" name="simulation_file" onChange={handleFileChange} /> */}
    </div>
  );
}