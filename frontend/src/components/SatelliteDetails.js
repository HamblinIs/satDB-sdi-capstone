import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function SatelliteDetails() {
  const navigate = useNavigate();
  const [selectedSatellite, setSelectedSatellite] = useState(0);

  const [satellite, setSatellite] = useState({
    orbit: "",
    owner: "",
    name: "",
    tail_num: "",
  });

  const [isEditing, setIsEditing] = useState(false);


  const id = 1; // delete this
  useEffect(() => {
    fetch(`http://localhost:8080/satellites/${id}`)
    .then(response => response.json())
    .then(data => setSatellite(data))
  }, []);

  const handleToggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    // {orbit: 'LEO', owner: 'NASA ', name: 'Hubble', tail_num: 45345}
    // create postBody for edits
    const postBody = {
      orbit: satellite.orbit,
      owner: satellite.owner,
      name: satellite.name,
      tail_num: satellite.tail_num,
    };

    // fetch POST the edits to the server
    fetch("http://localhost:8080/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postBody),
    });

    handleToggleEdit();
  };

  const handleChange = (e) => {
    // name is the key name
    // value is e.target.value
    const { name, value } = e.target;
    setSatellite((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <div>
      <button onClick={() => navigate("/")}>Back to Home</button>
      <h1>Satellite Details</h1>

      <br />

      <label>
        Satellite Orbit:
        <input
          type="text"
          name="orbit"
          value={satellite.orbit}
          onChange={handleChange}
          readOnly={!isEditing}
        />
      </label>

      <br />

      <label>
        Satellite Owner:
        <input
          type="text"
          name="owner"
          value={satellite.owner}
          onChange={handleChange}
          readOnly={!isEditing}
        />
      </label>

      <br />

      <label>
        Satellite Name:
        <input
          type="text"
          name="name"
          value={satellite.name}
          onChange={handleChange}
          readOnly={!isEditing}
        />
      </label>

      <br />

      <label>
        Tail Number:
        <input
          type="number"
          name="tail_num"
          value={satellite.tail_num}
          onChange={handleChange}
          readOnly={!isEditing}
        />
      </label>

      <br/>

      {isEditing ? (
        <button onClick={() => handleSave()}>Save</button>
      ) : (
        <button onClick={() => handleToggleEdit()}>Edit</button>
      )}



    </div>
  );
}
