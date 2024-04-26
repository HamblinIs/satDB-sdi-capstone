
import React, {useEffect} from 'react';
import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import styled from 'styled-components';

const StyleBox = styled.div`
margin-top: 130px
`

const satellite = require('satellite.js');

export default function SatelliteGroundTrack( { TLEData } ) {

    const { satelliteName, line1, line2 } = TLEData;
    
    const tle = `${line1}\n${line2}`;

    // example TLE
    // const tle = `1 55268U 23009A   24111.21074744  .00000021  00000+0  00000+0 0  9999
    // 2 55268  55.0835 179.4402 0002049 110.4542 258.9080  2.00568186  9448`;

    const calculateGroundTrack = (tle) => {
        // Split the TLE into lines
        const tleLines = tle.split('\n');

        // Convert the TLE lines into a satellite record (satrec) using the satellite.js library
        const satrec = satellite.twoline2satrec(tleLines[0].trim(), tleLines[1].trim());

        // Calculate the period of the satellite's orbit in minutes
        // satrec.no is in radians per minute
        const period = 2 * Math.PI / satrec.no; // minutes
        // console.log("satrec.no:", satrec.no)
        // console.log("period:", period)

        // Define the time step for the propagation
        const step = period / 200; // minutes

        // Get the current time in milliseconds since the Unix Epoch
        let currentTime = (new Date()).getTime();

        // Initialize arrays to store the latitudes and longitudes
        let latitudes = [];
        let longitudes = [];

        // Loop over one orbital period
        for (let t = 0; t < 2 * period; t += step) {
            // Propagate the satellite's position and velocity for the current time step
            // km? and km/s?
            const positionAndVelocity = satellite.propagate(satrec, new Date(currentTime + t * 60000));
            // console.log("position and velocity", positionAndVelocity)

            // Get the position in the Earth-Centered Inertial (ECI) coordinate system
            const positionEci = positionAndVelocity.position;

            // Calculate the Greenwich Mean Sidereal Time (GMST)
            const gmst = satellite.gstime(new Date(currentTime + t * 60000));

            // Convert the position from the ECI coordinate system to the geodetic coordinate system
            const positionGd = satellite.eciToGeodetic(positionEci, gmst);

            // Convert from radians to degrees
            const longitude = satellite.degreesLong(positionGd.longitude);
            const latitude = satellite.degreesLat(positionGd.latitude);

            longitudes.push(longitude);
            latitudes.push(latitude);

            // console.log(`Time: ${t}, Latitude: ${latitude}, Longitude: ${longitude}`);
        }

        return { longitudes, latitudes };
    }


    const { longitudes, latitudes } = calculateGroundTrack(tle);
    const positions = latitudes.map((lat, i) => [lat, longitudes[i]]);
    // positions.sort((a,b) => a[1]-b[1]);
    const splitPositions = splitPolyline(positions);



    return (
        <div>
        <StyleBox>
            <h1>{satelliteName}</h1>

            <MapContainer center={[0, 0]} zoom={2} style={{ height: "90vh", width: "90%", marginLeft: "5%", border: "solid black" }}>

                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />

                {
                splitPositions.map((positions, index) => (<Polyline positions={splitPositions[index]} color='red' />))
                }
                {/* <Polyline positions={splitPositions[0]} color='red' />
                <Polyline positions={splitPositions[1]} color='red' /> */}

                {/* {positions.map((position, idx) => (
                    <Marker key={idx} position={position} />
                ))} */}

            </MapContainer>
        </StyleBox>
        </div>
    );

};


function splitPolyline(positions) {
    const splitPolylines = [];
    let tempPolyline = [];

    for (let i = 0; i < positions.length - 1; i++) {
        tempPolyline.push(positions[i]);

        const currentLongitude = positions[i][1];
        const nextLongitude = positions[i + 1][1];

        if (Math.abs(nextLongitude - currentLongitude) > 180) {
            // We've crossed the antimeridian, so start a new polyline
            splitPolylines.push(tempPolyline);
            tempPolyline = [];
        }
    }

    // Push the last position into the current polyline
    tempPolyline.push(positions[positions.length - 1]);

    // Push the last polyline into the array of polylines
    splitPolylines.push(tempPolyline);

    return splitPolylines;
}