
import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Polyline, Popup, GeoJSON} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import styled from 'styled-components';
const satellite = require('satellite.js');

// import countriesData from './geojson/countries'; 
// import statesData from './geojson/states_provinces';

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

    const [mapType, setMapType] = useState('normal'); 
    const [countryData, setCountryData] = useState('');

    const toggleMapType = () => {
        setMapType(mapType === 'normal' ? 'satellite' : 'normal');
    };





    // const [seconds, setSeconds] = useState(0);

    // useEffect(() => {
    //     const intervalId = setInterval(() => {
    //         setSeconds(seconds => seconds + 1);
    //     }, 1000); // 1000 milliseconds = 1 second

    //     // Clean up function
    //     return () => {
    //         clearInterval(intervalId);
    //     };
    // }, []);





    useEffect(() => {
        fetchCountryData();
    }, []);

    const fetchCountryData = async () => {
        try {
            const response = await fetch('http://geojson.io/#data=data:application/json,%7B%22type%22%3A%22LineString%22%2C%22coordinates%22%3A%5B%5B0%2C0%5D%2C%5B10%2C10%5D%5D%7D');
            const data = await response.json();
            setCountryData(data);
        } catch (error) {
            console.error('Error fetching country data:', error);
        }
    };

    // example TLE
    // const tle = `1 55268U 23009A   24111.21074744  .00000021  00000+0  00000+0 0  9999
    // 2 55268  55.0835 179.4402 0002049 110.4542 258.9080  2.00568186  9448`;

    
    const currentTime = (new Date()).getTime();

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
        // const currentTime = (new Date()).getTime();

        // Initialize arrays to store the latitudes and longitudes
        let times = [];
        let latitudes = [];
        let longitudes = [];
        let altitudes = [];

        // Loop over one orbital period
        for (let t = 0; t < 14400; t += step) { // t is in minutes
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
            const altitude = positionGd.height; // Altitude in kilometers

            times.push(t);
            longitudes.push(longitude);
            latitudes.push(latitude);
            altitudes.push(altitude);

            // console.log(`Time: ${t}, Latitude: ${latitude}, Longitude: ${longitude}`);
        }

        return { times, longitudes, latitudes, altitudes };
    }

    // create the arrays for the polylines
    const { times, longitudes, latitudes, altitudes } = calculateGroundTrack(tle);
    const positions = latitudes.map((lat, i) => [lat, longitudes[i]]);
    // positions.sort((a,b) => a[1]-b[1]);
    const splitPositions = splitPolyline(positions);

    // satellite ground stations
    const markerPositions = [
                            // [28.488771081049144, -80.57774367921208],
                            //  [41.752538649728784, -70.53856967491647],
                            //  [48.72944168726237, -97.90506870961192],
                            //  [38.74408661344786, -104.8458510613487],
                            //  [64.2911231154675, -149.15957057178736],
                            //  [21.561368389582817, -158.23923199571044],
                            //  [42.94671264640525, -71.62817052852009],
                            //  [34.74187077507951, -120.57246164742834],
                            //  [-7.32005708056163, 72.42235700418554],
                            //  [76.53562570830366, -68.70218277253136],
                            //  [51.116119077647795, -0.906258544791876],
                            //  [13.587771184639555, 144.8408133260717],
                             [34.96420802612262, -106.46368895542169]];

    const satelliteIcon = L.icon({
        iconUrl: 'satellite_icon.png',
        iconSize: [25, 25], 
    });




    



const starfire = [34.96420802612262, -106.46368895542169, 1.84589928];
const myClosestPoint = findClosestPoint(starfire, longitudes, latitudes, altitudes);
const closestTime = new Date(currentTime + times[myClosestPoint.index] * 60000);
const mountainTime = closestTime.toLocaleString("en-US", {timeZone: "America/Denver"});
// console.log(`Mountain Time: ${mountainTime}`);
// console.log(`The closest point to ${starfire} is ${myClosestPoint}`);




    return (
        <div>
            <StyledButton onClick={() => navigate('/Satellites')}>Back to Celestrak Data</StyledButton>
            <StyledButton onClick={toggleMapType}>Toggle Map View</StyledButton>
            
        <StyleBox>
            <StyledH1>{satelliteName}</StyledH1>

            <MapContainer center={[0, 0]} zoom={2} style={{ height: "90vh", width: "90%", marginLeft: "5%", border: "solid black" }}>
            {mapType === 'normal' ? (
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    />
                ) : (
                    <TileLayer
                        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                        attribution='&copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
                    />
                )}

                {splitPositions.map((positions, index) => (
                    <Polyline positions={splitPositions[index]} color='red' />
                ))}

                {/* {markerPositions.map((position, idx) => (
                    <Marker key={idx} position={position} />
                ))} */}

                    <Marker key="starfire" position={starfire}>
                        <Popup><h4>Starfire Optical Range</h4></Popup>
                    </Marker>

                    <Polyline positions={[starfire, myClosestPoint.closestPoint]} color='blue' />
                    <Marker position={myClosestPoint.closestPoint}>
                        <Popup>
                        <h4>Target Satellite</h4>
                        Latitude, Longitude: <br/>
                        ({myClosestPoint.closestPoint[0]}, {myClosestPoint.closestPoint[1]}) <br/>
                        Altitude: {parseFloat(myClosestPoint.closestPoint[2].toFixed(4))} km <br/>
                        Mountain Time: {mountainTime} <br/>
                        Azimuth: {parseFloat(calculateBearing([starfire[0], starfire[1]], [myClosestPoint.closestPoint[0], myClosestPoint.closestPoint[1]]).toFixed(4))} deg from North <br/>
                        Elevation: {parseFloat(calculateElevationAngle(starfire, myClosestPoint.closestPoint).toFixed(4))} deg from horizontal <br/>
                        Distance: {parseFloat(myClosestPoint.shortestDistance.toFixed(4))} km
                        </Popup>
                    </Marker>

                    <Marker key="satellite_position" position={splitPositions[0][0]} icon={satelliteIcon}/>

                    {/* {mapType === 'satellite' && (
                    <>
                        <GeoJSON data={countriesData} style={{ fillColor: 'transparent', color: '#3388ff', weight: 1 }} />
                        <GeoJSON data={statesData} style={{ fillColor: 'transparent', color: '#ff8833', weight: 0.5 }} />
                    </>
                )} */}

                {mapType === 'satellite' && countryData && (
                    <GeoJSON data={countryData} style={{ fillColor: 'transparent', color: '#3388ff', weight: 1 }} />
                )}

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





function haversineDistance(lat1, lon1, lat2, lon2) {
    function toRad(x) {
        return x * Math.PI / 180;
    }

    const R = 6371; // Radius of the Earth in kilometers
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in kilometers
}



function findClosestPoint(starfire, longitudes, latitudes, altitudes) {
    let shortestDistance = Infinity;
    let closestPointIndex;

    for (let i = 0; i < longitudes.length; i++) {
        const surfaceDistance = haversineDistance(starfire[0], starfire[1], latitudes[i], longitudes[i]);
        const altitudeDifference = Math.abs(starfire[2] - altitudes[i]);
        const totalDistance = Math.sqrt(surfaceDistance * surfaceDistance + altitudeDifference * altitudeDifference);

        if (totalDistance < shortestDistance) {
            shortestDistance = totalDistance;
            closestPointIndex = i;
        }
    }

    return { 
        closestPoint: [latitudes[closestPointIndex], longitudes[closestPointIndex], altitudes[closestPointIndex]],
        index: closestPointIndex,
        shortestDistance: shortestDistance
    };
}



function calculateBearing([lat1, lon1], [lat2, lon2]) {
    function toRadians(degrees) {
        return degrees * Math.PI / 180;
    }

    function toDegrees(radians) {
        return radians * 180 / Math.PI;
    }

    // Convert latitudes and longitudes from degrees to radians
    lat1 = toRadians(lat1);
    lon1 = toRadians(lon1);
    lat2 = toRadians(lat2);
    lon2 = toRadians(lon2);

    // Calculate the difference in longitudes
    const dLon = lon2 - lon1;

    // Calculate the bearing
    const y = Math.sin(dLon) * Math.cos(lat2);
    const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);
    let bearing = toDegrees(Math.atan2(y, x));

    // Normalize the bearing to be between 0 and 360
    bearing = (bearing + 360) % 360;

    return bearing;
}



function calculateElevationAngle([lat1, lon1, alt1], [lat2, lon2, alt2]) {
    function toRadians(degrees) {
        return degrees * Math.PI / 180;
    }

    // Radius of the Earth in kilometers
    const R = 6371;

    // Convert latitudes and longitudes from degrees to radians
    lat1 = toRadians(lat1);
    lon1 = toRadians(lon1);
    lat2 = toRadians(lat2);
    lon2 = toRadians(lon2);

    // Calculate the difference in longitudes
    const dLon = lon2 - lon1;

    // Calculate the distance between the two points on the Earth's surface
    const d = Math.acos(Math.sin(lat1) * Math.sin(lat2) + Math.cos(lat1) * Math.cos(lat2) * Math.cos(dLon)) * R;

    // Calculate the difference in altitudes
    const h = alt2 - alt1;

    // Calculate the elevation angle
    const elevationAngle = Math.atan2(h, d);

    // Convert the elevation angle from radians to degrees
    const elevationAngleInDegrees = elevationAngle * 180 / Math.PI;

    return elevationAngleInDegrees;
}
