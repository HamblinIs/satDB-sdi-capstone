import React from 'react';
import styled from 'styled-components'
import Tracker from '../satellite-tracker/Tracker.js'

const BackgroundDiv = styled.div`
    justify-content: center;
    justify-items: center;
    align-items: center;
    align-content: center;
    background-color: #c4cfff;
    border: 4px solid #4a478a;
    margin-top: 20px;
    padding: 20px;
    gap: 5px;
    height: 70%;
    width: 70%;
`
export default function SatelliteModelOrbit() {
    return (
            <Tracker />
    )
}