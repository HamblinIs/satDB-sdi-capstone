import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SimpleLineChart from '../SimpleLineChart';
import FilesListViewer from '../FilesListViewer';
import styled from 'styled-components';
import { UserContext } from '../../App';
import './NewAssessmentDetails.css';

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

export default function AssessmentDetails() {
  const navigate = useNavigate();
  const { activeUser, setActiveUser } = useContext(UserContext);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedAssessment, setSelectedAssessment] = useState(0)
  const [assessmentInfo, setAssessmentInfo] = useState({})
  const assessmentId = useParams();

  const [name, setName] = useState("");
  const [associatedSatellite, setAssociatedSatellite] = useState([]);
  const [creation_date, setCreationDate] = useState("");
  const [description, setDescription] = useState("");
  const [owner, setOwner] = useState("");
  const [dataFiles, setDataFiles] = useState([]);
  const [simFiles, setSimFiles] = useState([]);
  const [miscFiles, setMiscFiles] = useState([]);

  useEffect(() => {
    // console.log("params id", assessmentId)
    fetch(`http://localhost:8080/assessments/${assessmentId.id}`)
      .then(res => res.json())
      .then(res => {
        setAssessmentInfo(res);
        setName(res.name);
        setAssociatedSatellite(res.satellites);
        setCreationDate(res.creation_date.slice(0,10));
        setDescription(res.description);
        setOwner(res.owner);
        setDataFiles(res.data_files);
        setSimFiles(res.sim_files);
        setMiscFiles(res.misc_files);
      })
  }, [assessmentId.id]);

  const handleSave = () => {

    const patchBody = {
      name: name,
      satellites: associatedSatellite,
      creation_date: creation_date,
      description: description,
      owner: owner,
      data_files: assessmentInfo.data_files,
      sim_files: assessmentInfo.sim_files,
      misc_files: assessmentInfo.misc_files,
    };

    // todo: need to check the save logic: fetch with PATCH method
    fetch(`http://localhost:8080/assessments/${assessmentId.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patchBody),
    })
      .then(response => response.json())
      .then(data => console.log(data));

    handleToggleEdit();
  }

  const handleToggleEdit = () => {
    setIsEditing(!isEditing);
  };


  if (assessmentInfo) {

    return (
    <div className='assessment-container'>
        <CenterDiv>
        <StyledButton onClick={() => navigate("../")}>Back</StyledButton>
        <h1 className='roboto-regular'>Assessment Details</h1>

        <div className='grid-3col'>
        <label>Name:
          {isEditing ? (
            <input className='searchbar3' type='text'  value={name} onChange={(e) => { setName(e.target.value) }} />
          ) : (
            <p>{name}</p>
          )}
        </label>

        <label>Creation Date:
          {isEditing ? (
            <input className='searchbar3' type='text' value={creation_date} onChange={(e) => { setCreationDate(e.target.value) }} />
          ) : (
            <p>{creation_date}</p>
          )}
        </label>

        <label>Description:
          {isEditing ? (
            <textarea value={description} onChange={(e) => { setDescription(e.target.value) }} />
          ) : (
            <p>{description}</p>
          )}
        </label>
        </div>


        <label>Associated Satellites:
          {isEditing ? (
            <input className='searchbar3' type='text' value={associatedSatellite} onChange={(e) => { associatedSatellite(e.target.value) }} />
          ) : (
            associatedSatellite.map(item => {
              return (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <p>Name: {item.name} | Tail Number: {item.tail_num}</p>
                  <StyledButton style={{marginLeft:'10px'}} onClick={() => navigate(`/SatelliteDetails/${item.id}`)}>Details</StyledButton>
                </div>
              )
            })

          )}
        </label>




        <br />

        {/* Isaac needs to designate whether to make this field "created by" with the user accounts, or remove
        <label>Owner:
          {isEditing ? (
            <input type='text' value={owner} onChange={(e) => { setOwner(e.target.value) }} />
          ) : (
            <p>{owner}</p>
          )}
        </label>

        <br /> */}
        <div className='grid-3col'>
        <label>Data Files
          <FilesListViewer state={assessmentInfo} setState={setAssessmentInfo} fileType="data_files" isEditing={isEditing} />
        </label>

    

        <label>Simulation Files
          <FilesListViewer state={assessmentInfo} setState={setAssessmentInfo} fileType="sim_files" isEditing={isEditing} />
        </label>

    

        <label>Misc Files
          <FilesListViewer state={assessmentInfo} setState={setAssessmentInfo} fileType="misc_files" isEditing={isEditing} />
        </label>
        </div>
        <br />

        {Object.keys(activeUser).length>0 &&
        (isEditing ? (
          <button onClick={() => handleSave()}>Save</button>
        ) : (
          <button onClick={() => handleToggleEdit()}>Edit</button>
        ))
        }

        <br />

        <h4>Visual Magnitude</h4>
        <SimpleLineChart />

        </CenterDiv>

    </div>
    );
  }
}

