import React, { useState } from 'react';

export default function CreateSatellite() {
  const [satellite, setSatellite] = useState({
    name: '',
    images: [],
    owner: '',
    tailNumber: 0,
    orbitalRegime: '',
    // details: '',
    created_by: [{id: 1, name:''}],
    model_file: '', // todo: need to have an input for model files and simulation files
    simulation_file: '',
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

    try {
      fetch ('http://localhost:8080/satellite/new', {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json'
        },

        body: JSON.stringify({
          name: satellite.name,
          orbit: satellite.orbitalRegime,
          owner: satellite.owner,
          tailNumber: satellite.tailNumber
        })
      })
      .then(async (res) => {
        if (res.status === 200) {
          alert("There was an error creating the item");
        } else {
          window.confirm("Item has been created!");
        }
      })
    } catch(error) {
      console.error('Failed to add satellite:', error);
    }
  }



  // const handleDeleteButtonClick = () => {
  //   console.log(selectedItemID);
  //   fetch("http://localhost:8080/delete-item", {
  //     method: "DELETE",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(delete_data)
  //   })
  //   .then((res) => {
  //     if (res.status === 409) {
  //       alert("There was an error deleting the item");
  //     } else {
  //       window.confirm("Item has been deleted!");
  //       setRefreshToggle(!refreshToggle);
  //       setItemSelected(false);
  //     }
  //   });
  // };







  return (
    <div>
      <h1>Create Satellite</h1>
      <form onSubmit={handleSubmit}>

        <label>Name:
          <input type="text" name="name" value={satellite.name} onChange={handleChange} />
        </label>
        <br/>
        <label>Tail Number:
          <input type="text" name="tailNumber" value={satellite.tailNumber} onChange={handleChange} />
        </label>
        <br/>
        <label>Orbital Regime:
          <select name="orbitalRegime" value={satellite.orbitalRegime} onChange={handleChange}>
            <option value="">--Please choose an option--</option>
            <option value="LEO">Low Earth Orbit (LEO)</option>
            <option value="MEO">Medium Earth Orbit (MEO)</option>
            <option value="GEO">Geostationary Orbit (GEO)</option>
          </select>
        </label>
        <br/>
        {/* <label>Details:
          <textarea name="details" value={satellite.details} onChange={handleChange} />
        </label>
        <br/> */}
        <label>Owner:
          <input type="text" name="owner" value={satellite.owner} onChange={handleChange} />
        </label>
        <br/>
        <label>Model File:
          <input type="file" name="model_file" onChange={handleFileChange} />
        </label>
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
