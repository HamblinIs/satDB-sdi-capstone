import React, { useState, useEffect } from 'react';
import './FileListViewer.css'

export default function FilesListViewer({ state, setState, fileType, isEditing }) {

    // fileTypes = [
    //     "images",
    //     "cad_models",
    //     "sim_files",
    //     "data_files",
    //     "misc_files"
    // ]

    // state = satellite || assessment

    // setState = setSatellite || setAssessment

    // satellite.images
    // satellite.cad_models
    // satellite.assessments

    // assessment.sim_files
    // assessment.misc_files
    // assessment.data_files

    // state[fileType]



    // const [file_path_array, set_file_path_array] = useState(
    //     [
    //         {file_path_name: "/some/path/name1.png"},
    //         {file_path_name: "/some/path/name2.png"},
    //         {file_path_name: "/some/path/name3.png"},
    //         {file_path_name: "/some/path/name4.png"},
    //         {file_path_name: "/some/path/name5.png"}
    //     ]
    // );



    const handleChange = (e, index) => {
        let new_file_path_array = [...state[fileType]];
        new_file_path_array[index].file_path_name = e.target.value;
        setState(prevState => ({ ...prevState, [fileType]: new_file_path_array }))

    }

    const handleDelete = (e, index) => {
        e.preventDefault();
        if (window.confirm("Are you sure you want to delete this file path?")) {
            const filteredArray = [...state[fileType]].filter((obj, i) => index !== i);
            setState(prevState => ({ ...prevState, [fileType]: filteredArray }))
        }
    }


    if (state[fileType]) {
        return (
            <div className="file-list-wrapper">
                {
                    state[fileType].map((obj, index) => {
                        if (isEditing) {
                            return (
                                <div className='file-line'>
                                <input type="text" key={index} value={obj.file_path_name} onChange={(e) => handleChange(e, index)} size='35' />
                                <button className="remove-button" onClick={(e) => handleDelete(e, index)}>×</button>
                                </div>
                            )
                        } else {
                            return (<p key={index} >{obj.file_path_name}</p>)
                        }

                    })
                }


                {
                    isEditing &&
                    (
                        <button onClick={() => setState(prevState => (
                            {
                                ...prevState,
                                [fileType]: [...prevState[fileType], { file_path_name: "" }]
                            }
                        ))}>Add file</button>
                    )
                }


            </div>

        );
    };
};