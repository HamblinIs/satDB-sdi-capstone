import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export default function Satellites({ setTLEData }) {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [parsedData, setParsedData] = useState(JSON.parse(localStorage.getItem('myKey')) || []);
    // localStorage.clear();


    const BackgroundDiv = styled.div`
justify-content: center;
justify-items: center;
align-items: center;
align-content: center;
background-color: #c4cfff;
border: 4px solid #4a478a;
margin-top: 20px;
margin-left: 25%;
padding: 20px;
gap: 5px;
width: 750px;
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
                    localStorage.setItem('myKey', JSON.stringify(data));
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
                <BackgroundDiv>

                    <h1>Satellite Table from Celestrak</h1>

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
                                            <button onClick={() => {
                                                setTLEData(data); // sets one satellite's TLE for SatelliteGroundTrack to display
                                                navigate('/SatelliteGroundTrack');
                                            }}>
                                                Ground Track
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    }



                </BackgroundDiv>
                <p>{`${currentPage} / ${totalPages}`}</p>
                <button onClick={prevPage} disabled={currentPage === 1}>Previous Page</button>
                <button onClick={nextPage} disabled={currentPage === totalPages}>Next Page</button>
            </>
        );
    }
}
