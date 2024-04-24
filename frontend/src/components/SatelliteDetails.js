import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ImageViewer from "./ImageViewer";
const imagesArr=["https://cdn.defenseone.com/media/img/cd/2023/08/11/GettyImages_1407240226/open-graph.jpg", "https://spaceplace.nasa.gov/satellite/en/TEMPO.en.jpg", "https://media.istockphoto.com/id/1339097795/photo/satellite-orbiting-the-earth.jpg?s=612x612&w=0&k=20&c=FMG2NypIT0JuZVs26qSYOq2qTwsO89woydrwZimK21s="];

export default function SatelliteDetails() {
  const navigate = useNavigate();
  const [selectedSatellite, setSelectedSatellite] = useState(0);

  const [satellite, setSatellite] = useState({
    orbit: "",
    owner: "",
    name: "",
    tail_num: "",
    assessments: [],
    cad_models: [],
    images: []
  });

  const [isEditing, setIsEditing] = useState(false);

  const { id } = useParams();

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

    // create patchBody for edits
    const patchBody = {
      orbit: satellite.orbit,
      owner: satellite.owner,
      name: satellite.name,
      tail_num: satellite.tail_num,
      assessments: satellite.assessments, // todo: ask issac if he wants this editable
      cad_models: satellite.cad_models, // array of objects, each object having a key file_path_name which stores a file path string
      images: satellite.images
    };

    // fetch PATCH the edits to the server
    fetch(`http://localhost:8080/satellites/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patchBody),
    })
      .then(response => response.json())
      .then(data => console.log(data));

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
        {isEditing ? (
        <input type="text" name="orbit" value={satellite.orbit} onChange={handleChange} />
        ) : (
          <p>{satellite.orbit}</p>
        )}
      </label>

      <br />

      <label>
        Satellite Owner:
        {isEditing ? (
        <input type="text" name="owner" value={satellite.owner} onChange={handleChange} />
        ) : (
          <p>{satellite.owner}</p>
        )}
      </label>

      <br />

      <label>
        Satellite Name:
        {isEditing ? (
        <input type="text" name="name" value={satellite.name} onChange={handleChange} />
        ) : (
          <p>{satellite.name}</p>
        )}
      </label>

      <br />

      <label>
        Tail Number:
        {isEditing ? (
        <input type="number" name="tail_num" value={satellite.tail_num} onChange={handleChange} />
        ) : (
          <p>{satellite.tail_num}</p>
        )}
      </label>

      <br/>
      <label>
        Associated Assessments:
        {isEditing ? (
        <input type="text" name="assessments" value={satellite.assessments} onChange={handleChange} />
        ) : (
          satellite.assessments.map(item => {
          return(
            <>
            <p>name: {item.name}</p>
            <p>creation date: {item.creation_date}</p>
          </>)
          }
        ))}
      </label>
      <br/>

      <label>
        CAD Models:
        {isEditing ? (
        <input type="text" name="cad_models" value={satellite.cad_models} onChange={handleChange} />
        ) : (
          satellite.cad_models.map(item => <p>name: {item.file_path_name}</p>))}
      </label>
      <br />
      
      <label>
        Image Files:
        {isEditing ? (
        <input type="text" name="images" value={satellite.images} onChange={handleChange} />
        ) : (
          satellite.images.map(item => <p>name: {item.file_path_name}</p>))}
      </label>
      <br />



      {isEditing ? (
        <button onClick={() => handleSave()}>Save</button>
      ) : (
        <button onClick={() => handleToggleEdit()}>Edit</button>
      )}


      <ImageViewer images={imagesArr} />

    </div>
  );
}
