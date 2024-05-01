import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FilesListViewer from "../FilesListViewer";
import { UserContext } from "../../App.js";
import ImageViewer from "../ImageViewer";
import styled from 'styled-components'
import './NewSatelliteDetails.css';

const CenterDiv = styled.div`
display: flex;
flex-flow: column;
justify-content: center;
justify-items: center;
align-items: center;
align-content: center;
`



const BackgroundDiv = styled.div`
align-self: center;
margin-top: 3%;
margin-inline: auto;
height: auto;
width: 50vw;
background: rgb(245, 246, 255);
border: 1px solid #4a478a;
border-radius: 34px;
box-shadow: inset 5px 5px 9px 0px #FFFFFF, 15px 15px 8px 0px rgba(0, 0, 0, 0.3);
/* overflow: hidden; */
display: flex;
align-items: start;
align-content: stretch;
justify-items: start;
justify-content: center;
padding: 75px 75px 75px 75px;
z-index: 0;
flex-direction: column;
flex-wrap: nowrap;
flex-grow: 1;
text-align: center;
/* margin: auto; */
`



const StyledButton = styled.button`
    display: flex;
    justify-content:center;
    justify-items:center;
    align-items:center;
    align-content:center;
    color: #081448;
    border-radius: 3px;
    border: 2px solid black;
    background-color: #96a6ef;
    width: 125px;
    height: 35px;
    font-weight: bold;
`


const imagesArr = ["https://cdn.defenseone.com/media/img/cd/2023/08/11/GettyImages_1407240226/open-graph.jpg", "https://spaceplace.nasa.gov/satellite/en/TEMPO.en.jpg", "https://media.istockphoto.com/id/1339097795/photo/satellite-orbiting-the-earth.jpg?s=612x612&w=0&k=20&c=FMG2NypIT0JuZVs26qSYOq2qTwsO89woydrwZimK21s="];

export default function SatelliteDetails() {
  const navigate = useNavigate();
  const { activeUser, setActiveUser } = useContext(UserContext);
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
      cad_models: satellite.cad_models,
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
    <BackgroundDiv>
        <CenterDiv>

        <StyledButton onClick={() => navigate("/search")}>Back</StyledButton>
        <h1 className='roboto-regular'>Satellite Details</h1>

        <label>Satellite Orbit:
            {isEditing ? (
            <input className='searchbar3' type="text" name="orbit" value={satellite.orbit} onChange={handleChange} />
            ) : (
            <p>{satellite.orbit}</p>
            )}
        </label>
        <br />

        <label>Satellite Owner:
            {isEditing ? (
            <input className='searchbar3' type="text" name="owner" value={satellite.owner} onChange={handleChange} />
            ) : (
            <p>{satellite.owner}</p>
            )}
        </label>
        <br />

        <label>Satellite Name:
            {isEditing ? (
            <input className='searchbar3' type="text" name="name" value={satellite.name} onChange={handleChange} />
            ) : (
            <p>{satellite.name}</p>
            )}
        </label>
        <br />

        <label>Tail Number:
            {isEditing ? (
            <input className='searchbar3' type="number" name="tail_num" value={satellite.tail_num} onChange={handleChange} />
            ) : (
            <p>{satellite.tail_num}</p>
            )}
        </label>
        <br />

        <label>Associated Assessments:
            {isEditing ? (
            <input className='searchbar3' type="text" name="assessments" value={satellite.assessments} onChange={handleChange} />
            ) : (
            satellite.assessments.map((item, index) => {
                return (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <p key={`p1${index}`}>Name: {item.name} | Creation Date: {item.creation_date.slice(0,10)} </p>
                    <StyledButton style={{marginLeft:'10px'}} onClick={() => navigate(`/AssessmentDetails/${item.id}`)}>Details</StyledButton>
                </div>
                )
            }
            ))}
        </label>
        <br />

        <label>CAD Models:
            <FilesListViewer state={satellite} setState={setSatellite} fileType="cad_models" isEditing={isEditing} />
        </label>
        <br />

        <label>Image Files:
            <FilesListViewer state={satellite} setState={setSatellite} fileType="images" isEditing={isEditing} />
        </label>
        <br />

        {Object.keys(activeUser).length>0 &&
            (isEditing ? (
                <button onClick={() => handleSave()}>Save</button>
            ) : (
                <button onClick={() => handleToggleEdit()}>Edit</button>
            ))
        }


    </CenterDiv>
    </BackgroundDiv>
  );
}
