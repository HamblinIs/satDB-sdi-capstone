import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SimpleLineChart from './SimpleLineChart';


export default function AssessmentDetails() {
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
      data_files: dataFiles, // question for issac: do we really need to edit these files?
      sim_files: simFiles,
      misc_files: miscFiles,
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
      <div>
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
            associatedSatellite.map( item => {
              return(
                <>
                <p>Name:{item.name}</p>
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

        <label>Data Files:</label>
        {dataFiles.map(item => <p>{item.file_path_name}</p>)}
        {/* <input type="file" name="model_file" onChange={handleFileChange} /> */}
        
        <br />

        <label>Simulation Files:</label>
        {simFiles.map(item => <p>{item.file_path_name}</p>)}

        {/* <input type="file" name="simulation_file" onChange={handleFileChange} /> */}

        <br />

        <label>Misc Files:</label>
        {miscFiles.map(item => <p>{item.file_path_name}</p>)}

        {/* <input type="file" name="simulation_file" onChange={handleFileChange} /> */}

        <br />


        {isEditing ? (
          <button onClick={() => handleSave()}>Save</button>
        ) : (
          <button onClick={() => handleToggleEdit()}>Edit</button>
        )}

        <br />
          
        <h4>Visual Magnitude</h4>
        <SimpleLineChart/>

      </div>
    );
  }
}

