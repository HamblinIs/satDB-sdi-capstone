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

export default function AssessmentDetails() {
  const navigate = useNavigate();
  const { activeUser, setActiveUser } = useContext(UserContext);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedAssessment, setSelectedAssessment] = useState(0)
  const [assessmentInfo, setAssessmentInfo] = useState({})
  const assessmentId = useParams();

  const [name, setName] = useState("");
  const [associatedSatellite, setAssociatedSatellite] = useState([]);
  const [associatedSatList, setAssociatedSatList] = useState([]);
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
  }, [assessmentId.id, isEditing]);

  useEffect(() => {
    const satList = async () =>{
      try {
        await fetch('http://localhost:8080/satellites')
        .then(response => response.json())
        .then(data => {
          setAssociatedSatList(data)
        })
      } catch (error) {
        console.error('Failed to add assessment:', error);
      }
    }
    satList();
    }, [])

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
      
        <button className='back-button' onClick={() => navigate("../search")}>Back</button>
        <h1 className='roboto-regular'>Assessment Details</h1>

        <div className='grid-3col'>
        <label>Name
          {isEditing ? (
            <input className='searchbar3' type='text'  value={name} onChange={(e) => { setName(e.target.value) }} />
          ) : (
            <p>{name}</p>
          )}
        </label>

        <label>Creation Date
          {isEditing ? (
            <input className='searchbar3' type='text' value={creation_date} onChange={(e) => { setCreationDate(e.target.value) }} />
          ) : (
            <p>{creation_date}</p>
          )}
        </label>

        <label>Description
          {isEditing ? (
            <textarea value={description} onChange={(e) => { setDescription(e.target.value) }} />
          ) : (
            <p>{description}</p>
          )}
        </label>

        </div>

        <label>Associated Satellites
        {isEditing ? (
            // <input type='text' value={associatedSatellite} onChange={(e) => { associatedSatellite(e.target.value) }} />
            <label>Associated Satellite:
              <select id="associatedSat" name="associatedSat"  onChange={(e) => {
                console.log(e.target.value)
                setAssociatedSatellite([{id: e.target.value}])}}>
                <option value="">--Please choose an option--</option>
                {associatedSatList.map(sat =>
                  <option key={sat.tail_num} value={sat.id}>{`${sat.name}, Tail #: ${sat.tail_num}`}</option>
                )}
                  <option value="N/A">No Associated Satellites</option>
              </select>
            </label>
          ) : (
            associatedSatellite.map(item => {
              return (
                <div className='flex-container'>
                  <p>Name: {item.name} | Tail Number: {item.tail_num}</p>
                  <button onClick={() => navigate(`/SatelliteDetails/${item.id}`)}>View Details</button>
                </div>
              )
            })

          )}
        </label>




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


        {Object.keys(activeUser).length>0 &&
        (isEditing ? (
          <button onClick={() => handleSave()}>Save</button>
        ) : (
          <button onClick={() => handleToggleEdit()}>Edit</button>
        ))
        }

        <div className='chart-area'>
        <h4>Visual Magnitude</h4>
        <div className='display-panel'>
          <SimpleLineChart />
        </div>
        </div>

    </div>
    );
  }
}

