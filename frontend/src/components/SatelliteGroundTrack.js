
import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import styled from 'styled-components';
const satellite = require('satellite.js');

const StyleBox = styled.div`
margin-top: 130px
`

const StyledButton = styled.button`
    // display: flex;
    // justify-content:center;
    // justify-items:center;
    // align-items:center;
    // align-content:center;
    color: black;
    border-radius: 7px;
    border: 1px solid black;
    background-color: #96a6ef;
    width: 170px;
    height: 30px;
`
const StyledH1 = styled.h1`
    color: white;
`


export default function SatelliteGroundTrack( { TLEData } ) {
    const navigate = useNavigate();

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
        for (let t = 0; t < 1.1*period; t += step) {
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

    const markerPositions = [[28.488771081049144, -80.57774367921208],
                             [41.752538649728784, -70.53856967491647],
                             [48.72944168726237, -97.90506870961192],
                             [38.74408661344786, -104.8458510613487],
                             [64.2911231154675, -149.15957057178736],
                             [21.561368389582817, -158.23923199571044],
                             [42.94671264640525, -71.62817052852009],
                             [34.74187077507951, -120.57246164742834],
                             [-7.32005708056163, 72.42235700418554],
                             [76.53562570830366, -68.70218277253136],
                             [51.116119077647795, -0.906258544791876],
                             [13.587771184639555, 144.8408133260717],
                             [34.96420802612262, -106.46368895542169]];

    const satelliteIcon = L.icon({
        iconUrl: 'satellite_icon.png',
        iconSize: [25, 25], 
    });




    return (
        <div>
            <StyledButton onClick={() => navigate('/Satellites')}>Back to Celestrak Data</StyledButton>
        <StyleBox>
            <StyledH1>{satelliteName}</StyledH1>

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

                {markerPositions.map((position, idx) => (
                    <Marker key={idx} position={position} />
                ))}

                    <Marker key="current_position" position={splitPositions[0][0]} icon={satelliteIcon}/>

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