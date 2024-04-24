import React , { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export default function SimpleLineChart() {
    const [csvData, setCsvData] = useState();

    // fetch the csv data
    useEffect(() => {
        // this looks at the public directory
        Papa.parse('/data.csv', { // todo: need to dynamically fetch csv files
            download: true,
            header: true,
            complete: async (result) => {
                await setCsvData(result.data);
                // console.log(csvData);
            }
        });
    }, []);


    if (csvData) {
        return (



            <LineChart
                width={800}
                height={600}
                data={csvData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis type="number" domain={[0, Math.max(...csvData.map(obj => obj.magnitude))]} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="magnitude" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>




        );

    };
};