import React from 'react';
import {useState} from 'react';
import styled from 'styled-components'
import Tracker from '../Copied-satellite-tracker/Tracker.js'

const CenterDiv = styled.div`
    justify-content: center;
    justify-items: center;
    align-items: center;
    align-content: center;
`


export default function SatelliteModelOrbit() {

    const [constellation, setConstellation] = useState(false);
    const [selected, setSelected] = useState("");

    const handleClick = () => {
        setSelected(document.getElementById("constellation-select").value);
        console.log("selected", selected)
        setConstellation(true);
    }

    return (
        <div className = "tracker-container">
            {constellation ?
        <div className = "globe-container">
            <Tracker constellation = {selected} />
        </div>
            :
            <>
            <h1>Select Constellation to View</h1>
            <input type="text" id="constellation-select" placeholder="Type Constellation"></input>
            <button type="submit" onClick={() => handleClick()}>Submit</button>
            </>
        }
        
        </div>
    )
}