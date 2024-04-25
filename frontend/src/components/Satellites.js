import React, { useState, useEffect } from 'react';
import styled from 'styled-components'

export default function Satellites() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

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

  const nextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(prevPage => (prevPage > 1 ? prevPage - 1 : prevPage));
  };

    if (data.length > 0) {
        return (
            <>
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
            <button onClick={prevPage} disabled={currentPage === 1}>Previous Page</button>
            <button onClick={nextPage}>Next Page</button>
            </>
        );
    }
}
