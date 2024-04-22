
import React from 'react';
// import satellite from 'satellite.js';
import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const satellite = require('satellite.js');

export default function SatelliteGroundTrack() {


    const calculateGroundTrack = (satelliteData) => {
        // // Convert the epoch from the TLE into a JavaScript Date object
        const epoch = new Date(satelliteData.EPOCH);

        // // Define the satellite record (sgp4init) from orbital elements
        const satrec = satellite.twoline2satrec(
            // `1 ${satelliteData.NORAD_CAT_ID}`,
            // `2 ${satelliteData.NORAD_CAT_ID} ${satelliteData.INCLINATION} ${satelliteData.RA_OF_ASC_NODE} ${satelliteData.ECCENTRICITY} ${satelliteData.ARG_OF_PERICENTER} ${satelliteData.MEAN_ANOMALY} ${satelliteData.MEAN_MOTION}`
            `1 00694U 63047A   24112.92261363  .00003936  00000+0  48755-3 0  9993`,
            `2 00694  30.3557  61.0634 0566758 167.6695 193.8430 14.07287348 34628`
        
        );

        // // Propagate satellite using time since epoch (in minutes).
        // const positionAndVelocity = satellite.propagate(satrec, epoch);

        // // Get position and velocity vectors from the result
        // const positionEci = positionAndVelocity.position;
        // const velocityEci = positionAndVelocity.velocity;

        // // Get GMST for the given date
        // const gmst = satellite.gstime(epoch);

        // // Get the geodetic coordinates (latitude, longitude, altitude)
        // const geodeticCoords = satellite.eciToGeodetic(positionEci, gmst);

        // // Convert radians to degrees
        // const latitude = satellite.degreesLat(geodeticCoords.latitude);
        // const longitude = satellite.degreesLong(geodeticCoords.longitude);
        // const altitude = geodeticCoords.height;


        // Calculate the period of the orbit (in minutes)
        const period = 1440 / satelliteData.MEAN_MOTION;

        // Calculate the time step (in minutes)
        const timeStep = 1; // You can adjust this value as needed

        // Initialize an array to hold the ground track coordinates
        const groundTrack = [];

        for (let t = 0; t <= period; t += timeStep) {
            // Calculate the time since epoch
            const timeSinceEpoch = new Date(epoch.getTime() + t * 60 * 1000);

            // Propagate the satellite's position and velocity
            const positionAndVelocity = satellite.propagate(satrec, timeSinceEpoch);
            console.log(positionAndVelocity)

            // Get the position in ECI coordinates
            const positionEci = positionAndVelocity.position;

            // Get the GMST for the given date
            const gmst = satellite.gstime(timeSinceEpoch);

            // Get the geodetic coordinates (latitude, longitude, altitude)
            const geodeticCoords = satellite.eciToGeodetic(positionEci, gmst);

            // Convert radians to degrees
            const latitude = satellite.degreesLat(geodeticCoords.latitude);
            const longitude = satellite.degreesLong(geodeticCoords.longitude);

            // Add the coordinates to the ground track
            groundTrack.push({ latitude, longitude });
        }

        // Now, `groundTrack` is an array of objects, each with a `latitude` and `longitude` property



        return groundTrack;
    }

    // example satellite object
    const satelliteData = {
        "OBJECT_NAME": "ATLAS CENTAUR 2",
        "OBJECT_ID": "1963-047A",
        "EPOCH": "2024-04-20T20:36:38.101248",
        "MEAN_MOTION": 14.07277452,
        "ECCENTRICITY": 0.0566761,
        "INCLINATION": 30.3549,
        "RA_OF_ASC_NODE": 66.9653,
        "ARG_OF_PERICENTER": 158.358,
        "MEAN_ANOMALY": 204.2006,
        "EPHEMERIS_TYPE": 0,
        "CLASSIFICATION_TYPE": "U",
        "NORAD_CAT_ID": 694,
        "ELEMENT_SET_NO": 999,
        "REV_AT_EPOCH": 3447,
        "BSTAR": 0.00042161,
        "MEAN_MOTION_DOT": 3.415e-5,
        "MEAN_MOTION_DDOT": 0
    };

    console.log(calculateGroundTrack(satelliteData));
    const groundTrack = calculateGroundTrack(satelliteData);
  

    return (
        <MapContainer center={[groundTrack[0].latitude, groundTrack[0].longitude]} zoom={2} style={{ height: "100vh", width: "100%" }}>
            {/* <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <Polyline positions={groundTrack} color='red' /> */}
        </MapContainer>
    );





}