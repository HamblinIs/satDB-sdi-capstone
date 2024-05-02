import React , { useState, useEffect, PureComponent } from 'react';
import Papa from 'papaparse';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label, ResponsiveContainer } from 'recharts';
// import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend} from 'recharts';


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


            <ResponsiveContainer width="100%" height="100%">
            <LineChart
                // width={800}
                // height={600}
                data={csvData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                style={{backgroundColor: 'white'}}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" id="Time" >
                    <Label
                        value="Time(s)"
                        dy={10}
                        position="insideBottom"
                        style={{
                            textAnchor: "middle",
                            fontSize: "125%",
                            fill: "black",
                        }}
                        />
                </XAxis>
                <YAxis type="number" id="Magnitude" domain={[0, Math.max(...csvData.map(obj => obj.magnitude))+50]} >
                    <Label
                        value="Visual Magnitude (unitless)"
                        angle={270}
                        position="insideLeft"
                        style={{
                            textAnchor: "middle",
                            fontSize: "125%",
                            fill: "black",
                        }}
                        />
                </YAxis>
                <Tooltip />
                <Legend />
                <Line type="monotone"  dataKey="magnitude" stroke="#1a2c80" strokeWidth={3} activeDot={{ r: 8 }} />
            </LineChart>
            </ResponsiveContainer>
        // <AreaChart
        //   width={500}
        //   height={400}
        //   data={csvData}
        //   margin={{
        //     top: 10,
        //     right: 30,
        //     left: 0,
        //     bottom: 0,
        //   }}
        // >
        //   <CartesianGrid strokeDasharray="3 3" />
        //   <XAxis dataKey="time" />
        //   <YAxis type="number" domain={[0, Math.max(...csvData.map(obj => obj.magnitude))]}/>
        //   <Tooltip />
        //   <Legend />
        //   <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
        // </AreaChart>


        );

    };
};