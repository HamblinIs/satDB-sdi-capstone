import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import './Celestrak.css'

export default function Celestrak({ setTLEData }) {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(parseInt(localStorage.getItem('currentPage')) || 1);
    const [parsedData, setParsedData] = useState(JSON.parse(localStorage.getItem('parsedData')) || []);
    // localStorage.clear();


    const CenterDiv = styled.div`
      display: flex;
      flex-flow: column;
      justify-content: center;
      justify-items: center;
      align-items: center;
      align-content: center;
      `

    const ButtonsDiv = styled.div`
      display: flex;
      flex-flow: row;
      justify-content: center;
      justify-items: center;
      align-items: center;
      align-content: center;
      `



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
      width: 750px;
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



    const StyledButton2 = styled.button`
      color: black;
      border-radius: 3px;
      display: flex;
      justify-content:center;
      justify-items:center;
      align-items:center;
      align-content:center;
      border: 1px solid black;
      background-color: #96a6ef;
      width: 100px;
      height: 60px;
      `

    // function that transforms the raw TLE data into an array of objects
    // each object is a satellite containing satelliteName, line1, line2
    function parseTLEData(rawData) {
        // Split the raw data into lines
        const lines = rawData.split('\n');
        let parsedData = [];
        for (let i = 0; i < lines.length; i += 3) {
            // Extract relevant information
            const satelliteName = lines[i].trim();
            const line1 = lines[i + 1]?.trim();
            const line2 = lines[i + 2]?.trim();
            // Construct an object to hold the parsed data
            const data = {
                satelliteName: satelliteName,
                line1: line1,
                line2: line2
            };
            // Add the object to the parsedData array
            parsedData.push(data);
        }
        return parsedData;
    };


    // slice the parsedData into pages of 10 records
    const recordsPerPage = 10;
    const totalPages = Math.ceil(parsedData.length / recordsPerPage);
    const startingIndex = (currentPage - 1) * recordsPerPage;
    const endingIndex = startingIndex + recordsPerPage;
    const pagedData = parsedData.slice(startingIndex, endingIndex);

    // console.log(pagedData)

    // fetch the data if it isn't found in parsedData
    useEffect(() => {
        if (parsedData.length === 0) {
            fetch('https://celestrak.org/NORAD/elements/gp.php?GROUP=visual&FORMAT=tle')
                .then(response => response.text())
                .then(data => parseTLEData(data)) // parse into array of objects
                .then(data => { // pop empty record from the array
                    if (data.length > 0 && data[data.length - 1].satelliteName === "") {
                        data.pop();
                    }
                    return data;
                })
                .then(data => { // set the data in the state and local storage
                    setParsedData(data);
                    localStorage.setItem('parsedData', JSON.stringify(data));
                    console.log("local storage not found... data was fetched");
                })
        }
    }, []);




    // paging functions
    const nextPage = () => {
        setCurrentPage(prevPage => prevPage + 1);
    };

    const prevPage = () => {
        setCurrentPage(prevPage => (prevPage > 1 ? prevPage - 1 : prevPage));
    };



    if (pagedData.length > 0) {
        return (
            <>
<div className='satellite-container'>
    <div className='content-wrapper'>
            <CenterDiv>
            <BackgroundDiv>

            <CenterDiv>
            <StyledButton onClick={() => navigate('../')}>Back</StyledButton>
            <h1>100 Brightest Satellites from Celestrak</h1>
            
            <p>{`${currentPage} / ${totalPages}`}</p>
            <ButtonsDiv>
                <StyledButton onClick={prevPage} disabled={currentPage === 1}>Prev</StyledButton>
                <StyledButton onClick={nextPage} disabled={currentPage === totalPages}>Next</StyledButton>
            </ButtonsDiv>
            </CenterDiv>
            {
                <table>
                    <thead>
                        <tr>
                            <th>Satellite Name</th>
                            <th>Line 1</th>
                            <th>Line 2</th>
                            <th>Ground Track</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pagedData.map((data, index) => (
                            <tr key={index}>
                                <td>{data.satelliteName}</td>
                                <td>{data.line1}</td>
                                <td>{data.line2}</td>
                                <td>
                                    <StyledButton2 onClick={() => {
                                        setTLEData(data); // sets one satellite's TLE for SatelliteGroundTrack to display
                                        navigate('../NewGroundTrack');
                                        localStorage.setItem('currentPage', currentPage.toString())
                                    }}>
                                        Ground Track
                                    </StyledButton2>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            }


            </BackgroundDiv>
            </CenterDiv>
            </div>
</div>
            </>
        );
    }
}
