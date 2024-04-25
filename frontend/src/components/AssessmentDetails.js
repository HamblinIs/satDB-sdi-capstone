import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SimpleLineChart from './SimpleLineChart';
import FilesListViewer from './FilesListViewer';
import styled from 'styled-components';
import { UserContext } from '../App';

const CenterDiv = styled.div`
display: flex;
flex-flow: column;
justify-content: center;
justify-items: center;
align-items: center;
align-content: center;
`

const BackgroundDiv = styled.div`
display: flex;
flex-flow: column;
justify-content: center;
justify-items: center;
align-items: center;
align-content: center;
background-color: #c4cfff;
width: 70%;
border: 4px solid #4a478a;
margin-top: 20px;
padding: 20px;
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
        setCreationDate(res.creation_date);
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
      <CenterDiv>
      <BackgroundDiv>
        <button onClick={() => navigate("/search")}>Back to Search</button>
        <h1>Assessment Details</h1>

        <label>Name:
          {isEditing ? (
            <input type='text' value={name} onChange={(e) => { setName(e.target.value) }} />
          ) : (
            <p>{name}</p>
          )}
        </label>

        <br />

        <label>Associated Satellites:
          {isEditing ? (
            <input type='text' value={associatedSatellite} onChange={(e) => { associatedSatellite(e.target.value) }} />
          ) : (
            associatedSatellite.map(item => {
              return (
                <>
                  <p>Name: <button onClick={() => navigate(`/SatelliteDetails/${item.id}`)}>{item.name}</button></p>
                  <p>Tail Number:{item.tail_num}</p>
                </>
              )
            })

          )}
        </label>

        <br />

        <label>Creation Date:
          {isEditing ? (
            <input type='text' value={creation_date} onChange={(e) => { setCreationDate(e.target.value) }} />
          ) : (
            <p>{creation_date}</p>
          )}
        </label>

        <br />

        <label>Description:
          {isEditing ? (
            <textarea value={description} onChange={(e) => { setDescription(e.target.value) }} />
          ) : (
            <p>{description}</p>
          )}
        </label>

        <br />

        {/* Isaac needs to designate whether to make this field "created by" with the user accounts, or remove */}
        <label>Owner:
          {isEditing ? (
            <input type='text' value={owner} onChange={(e) => { setOwner(e.target.value) }} />
          ) : (
            <p>{owner}</p>
          )}
        </label>

        <br />

        <label>Data Files:
          <FilesListViewer state={assessmentInfo} setState={setAssessmentInfo} fileType="data_files" isEditing={isEditing} />
        </label>

        <br />

        <label>Simulation Files:
          <FilesListViewer state={assessmentInfo} setState={setAssessmentInfo} fileType="sim_files" isEditing={isEditing} />
        </label>

        <br />

        <label>Misc Files:
          <FilesListViewer state={assessmentInfo} setState={setAssessmentInfo} fileType="misc_files" isEditing={isEditing} />
        </label>

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

      </BackgroundDiv>
      </CenterDiv>
    );
  }
}

