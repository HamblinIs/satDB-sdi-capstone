import React, { useState, useEffect } from 'react';

export default function Satellites() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://celestrak.org/NORAD/elements/gp.php?GROUP=visual&FORMAT=json')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error:', error));
  }, []);

    if (data.length > 0) {
        return (
            <div>
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
            </div>
        );
    }
}
