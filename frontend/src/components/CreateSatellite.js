import React, { useState } from 'react';

export default function CreateSatellite() {
  const [satellite, setSatellite] = useState({
    name: '',
    tailNumber: '',
    orbitalRegime: '',
    details: '',
    owner: '',
    file: null // todo: need to have an input for model files and simulation files
  });

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
    e.preventDefault();
    // todo: send a POST request to the satellites table
    console.log(satellite);
  };

  return (
    <div>
      <h1>Create Satellite</h1>
      <form onSubmit={handleSubmit}>

        <label>Name:
          <input type="text" name="name" value={satellite.name} onChange={handleChange} />
        </label>

        <label>Tail Number:
          <input type="text" name="tailNumber" value={satellite.tailNumber} onChange={handleChange} />
        </label>

        <label>Orbital Regime:
          <select name="orbitalRegime" value={satellite.orbitalRegime} onChange={handleChange}>
            <option value="">--Please choose an option--</option>
            <option value="LEO">Low Earth Orbit (LEO)</option>
            <option value="MEO">Medium Earth Orbit (MEO)</option>
            <option value="GEO">Geostationary Orbit (GEO)</option>
          </select>
        </label>

        <label>Details:
          <input type="text" name="details" value={satellite.details} onChange={handleChange} />
        </label>

        <label>Owner:
          <input type="text" name="owner" value={satellite.owner} onChange={handleChange} />
        </label>

        <label>File:
          <input type="file" name="file" onChange={handleFileChange} />
        </label>

        <input type="submit" value="Submit" />
      
      </form>
    </div>
  );
}
