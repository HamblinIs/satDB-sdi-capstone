import React, { useState, useEffect } from 'react';
import styled from 'styled-components'

export default function Satellites() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

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

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const fetchData = () => {

    const startingIndex = (currentPage - 1) * 10;
    const endingIndex = startingIndex + 10;


    fetch('https://celestrak.org/NORAD/elements/gp.php?GROUP=visual&FORMAT=json')
      .then(response => response.json())
    //   .then(data => setData(data.map(item => {
        .then(data => {
            // const first10 = data.slice(0,10)

            const addData = data.slice(startingIndex, endingIndex).map(item => ({
                Name: item.OBJECT_NAME,
                object_id: item.OBJECT_ID,
                epoch: item.EPOCH,
                mean_motion: item.MEAN_MOTION,
                eccentricity: item.ECCENTRICITY,
                inclination: item.INCLINATION

        }));




        setData(addData)
      })
      .catch(error => console.error('Error:', error));
  };

//   function parseTLEData(rawData) {
//     // Split the raw data into lines
//     const lines = rawData.split('\n');
//     const satellites = [];

//     // Extract relevant information
//     for (let i = 0; i < lines.length; i += 3) {

//       if (i + 2 < lines.length) {


//       const satelliteName = lines[i].trim();
//       const line1 = lines[i + 1].trim();
//       const line2 = lines[i + 2].trim();

//       const parsedData = {
//         satelliteName: satelliteName,
//         line1: line1,
//         line2: line2
//     };

//     satellites.push(parsedData)
//     } else {
//       console.error('Incomplete satellite entry at index', i);
//     }
//   }

//     // Construct an object to hold the parsed data


//     return satellites;
// }

//   useEffect(() => {
//     fetch('https://celestrak.org/NORAD/elements/gp.php?GROUP=visual&FORMAT=tle')
//     .then(response => response.text())
//     .then(data => {
//       const parsedData = parseTLEData(data);

//       console.log(parsedData)
//     } )

//     .catch(err => {
//       console.error('Error fetching parsed data:', err)
//     })
//   }, [])


  const nextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(prevPage => (prevPage > 1 ? prevPage - 1 : prevPage));
  };

    if (data.length > 0) {
        return (
            <CenterDiv>
            <BackgroundDiv>

                <h1>Satellite Table from Celestrak</h1>


                    <table>
                        <thead>
                            <tr>
                                {Object.keys(data[0]).map(key => (
                                    <th key={key}>{key}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, index) => (
                                <tr key={index}>
                                    {Object.values(item).map((value, index) => (
                                        <td key={index} style={{border: '1px solid black'}}>{value}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>

                    </table>
            </BackgroundDiv>
            <ButtonsDiv>
            <StyledButton onClick={prevPage} disabled={currentPage === 1}>Previous Page</StyledButton>
            <StyledButton onClick={nextPage}>Next Page</StyledButton>
            </ButtonsDiv>
            </CenterDiv>
        );
    }
  }
