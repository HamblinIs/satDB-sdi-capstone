const satellite = require('satellite.js');

function calculateGroundTrack(satelliteData) {
    // Convert the epoch from the TLE into a JavaScript Date object
    const epoch = new Date(satelliteData.EPOCH);

    // Define the satellite record (sgp4init) from orbital elements
    const satrec = satellite.twoline2satrec(
        `1 ${satelliteData.NORAD_CAT_ID}`,
        `2 ${satelliteData.NORAD_CAT_ID} ${satelliteData.INCLINATION} ${satelliteData.RA_OF_ASC_NODE} ${satelliteData.ECCENTRICITY} ${satelliteData.ARG_OF_PERICENTER} ${satelliteData.MEAN_ANOMALY} ${satelliteData.MEAN_MOTION}`
    );

    // Propagate satellite using time since epoch (in minutes).
    const positionAndVelocity = satellite.propagate(satrec, epoch);

    // Get position and velocity vectors from the result
    const positionEci = positionAndVelocity.position;
    const velocityEci = positionAndVelocity.velocity;

    // Get GMST for the given date
    const gmst = satellite.gstime(epoch);

    // Get the geodetic coordinates (latitude, longitude, altitude)
    const geodeticCoords = satellite.eciToGeodetic(positionEci, gmst);

    // Convert radians to degrees
    const latitude = satellite.degreesLat(geodeticCoords.latitude);
    const longitude = satellite.degreesLong(geodeticCoords.longitude);
    const altitude = geodeticCoords.height;

    return { latitude, longitude, altitude };
}

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
