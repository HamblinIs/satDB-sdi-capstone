
import React from 'react';
import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';


const satellite = require('satellite.js');

export default function SatelliteGroundTrack() {

     // example satellite object
    const satelliteData = {
        "OBJECT_NAME": "GPS BIII-6  (PRN 28)",
        "OBJECT_ID": "2023-009A",
        "EPOCH": "2024-04-20T05:03:28.578816",
        "MEAN_MOTION": 2.00568186,
        "ECCENTRICITY": 0.0002049,
        "INCLINATION": 55.0835,
        "RA_OF_ASC_NODE": 179.4402,
        "ARG_OF_PERICENTER": 110.4542,
        "MEAN_ANOMALY": 258.908,
        "EPHEMERIS_TYPE": 0,
        "CLASSIFICATION_TYPE": "U",
        "NORAD_CAT_ID": 55268,
        "ELEMENT_SET_NO": 999,
        "REV_AT_EPOCH": 944,
        "BSTAR": 0,
        "MEAN_MOTION_DOT": 2.1e-7,
        "MEAN_MOTION_DDOT": 0
    };

    // example TLE
    const tle = `1 55268U 23009A   24111.21074744  .00000021  00000+0  00000+0 0  9999
    2 55268  55.0835 179.4402 0002049 110.4542 258.9080  2.00568186  9448`;

    const calculateGroundTrack = (tle) => {
        // Split the TLE into lines
        const tleLines = tle.split('\n');

        // Convert the TLE lines into a satellite record (satrec) using the satellite.js library
        const satrec = satellite.twoline2satrec(tleLines[0].trim(), tleLines[1].trim());

        // Calculate the period of the satellite's orbit in seconds
        const period = 2 * Math.PI / satrec.no;

        // Define the time step for the propagation
        const step = period / 100;

        // Get the current time in milliseconds since the Unix Epoch
        let currentTime = (new Date()).getTime();

        // Initialize arrays to store the latitudes and longitudes
        let latitudes = [];
        let longitudes = [];

        // Loop over one orbital period
        for (let t = 0; t < 120 * period; t += step) {
            // Propagate the satellite's position and velocity for the current time step
            const positionAndVelocity = satellite.propagate(satrec, new Date(currentTime + t * 1000));

            // Get the position in the Earth-Centered Inertial (ECI) coordinate system
            const positionEci = positionAndVelocity.position;

            // Calculate the Greenwich Mean Sidereal Time (GMST)
            const gmst = satellite.gstime(new Date(currentTime + t * 1000));

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
    positions.sort((a,b) => a[1]-b[1]);




// // Convert EPOCH to the format used in TLE
// let epochYear = satelliteData.EPOCH.substr(0, 4).slice(-2);
// let epochDay = (new Date(satelliteData.EPOCH) - new Date(`${epochYear}0101`)) / (1000 * 60 * 60 * 24);

// // Convert MEAN_MOTION to revolutions per day
// let meanMotion = satelliteData.MEAN_MOTION * 24;

// // Convert BSTAR to the format used in TLE
// let bstar = satelliteData.BSTAR.toExponential().replace('+', '');

// const tle = `1 ${satelliteData.NORAD_CAT_ID.toString().padStart(5, '0')}U ${satelliteData.OBJECT_ID} ${epochYear}${epochDay.toFixed(8)} ${satelliteData.MEAN_MOTION_DOT.toExponential().replace('+', '').padStart(10, '0')} ${bstar} 0 ${satelliteData.ELEMENT_SET_NO.toString().padStart(4, '0')}
// 2 ${satelliteData.NORAD_CAT_ID.toString().padStart(5, '0')} ${satelliteData.INCLINATION.toFixed(4)} ${satelliteData.RA_OF_ASC_NODE.toFixed(4)} ${satelliteData.ECCENTRICITY.toFixed(7).replace('0.', '')} ${satelliteData.ARG_OF_PERICENTER.toFixed(4)} ${satelliteData.MEAN_ANOMALY.toFixed(4)} ${meanMotion.toFixed(8)}${satelliteData.REV_AT_EPOCH.toString().padStart(5, '0')}`;






    


  

    return (

        <MapContainer center={[0, 0]} zoom={2} style={{ height: "90vh", width: "90%", marginLeft: "5%", border: "solid black" }}>
            
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />

            <Polyline positions={positions} color='red' />

            {/* {positions.map((position, idx) => (
                <Marker key={idx} position={position} />
            ))} */}

        </MapContainer>
    );





}