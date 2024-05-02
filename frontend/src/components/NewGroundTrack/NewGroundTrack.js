import React, {useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Polyline, Popup, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import styled from 'styled-components';
import'./NewGroundTrack.css'


const satellite = require('satellite.js');



export default function SatelliteGroundTrack( { TLEData, setTLEData } ) {
    const navigate = useNavigate();

    const { satelliteName, line1, line2 } = TLEData;

    const [periodMultiplier, setPeriodMultiplier] = useState(1);

    const tle = `${line1}\n${line2}`;

    const [mapType, setMapType] = useState('normal');
    const [countryData, setCountryData] = useState(null);

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
                const response = await fetch('https://nominatim.openstreetmap.org/search?q=country&format=geojson');
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
    let period;

    const calculateGroundTrack = (tle) => {
        // Split the TLE into lines
        const tleLines = tle.split('\n');

        // Convert the TLE lines into a satellite record (satrec) using the satellite.js library
        const satrec = satellite.twoline2satrec(tleLines[0].trim(), tleLines[1].trim());

        // Calculate the period of the satellite's orbit in minutes
        // satrec.no is in radians per minute
        period = 2 * Math.PI / satrec.no; // minutes
        // console.log("satrec.no:", satrec.no)
        // console.log("period:", period)

        // Define the time step for the propagation
        const step = period / 100; // minutes

        // Get the current time in milliseconds since the Unix Epoch
        // const currentTime = (new Date()).getTime();

        // Initialize arrays to store the latitudes and longitudes
        let times = [];
        let latitudes = [];
        let longitudes = [];
        let altitudes = [];

        // Loop over one orbital period
        for (let t = 0; t < periodMultiplier * period; t += step) { // t is in minutes
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

            // Convert t as a datetime object, then convert from UTC to Mountain Time
            const t_as_datetime = new Date(currentTime + t * 60000);
            const t_in_mountaintime = t_as_datetime.toLocaleString("en-US", {timeZone: "America/Denver"});

            times.push(t_in_mountaintime);
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

    const satelliteControlNetwork = [
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
                            //  [13.587771184639555, 144.8408133260717]
                        ];

    const satelliteIcon = L.icon({
        iconUrl: '/satellite_icon.png',
        iconSize: [25, 25],
    });


    // this fixed the marker icon issue
    L.Icon.Default.mergeOptions({
        iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
        iconUrl: require('leaflet/dist/images/marker-icon.png'),
        shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
      });




const starfire = [34.96420802612262, -106.46368895542169, 1.84589928]; // [lat, lon, alt] in [deg N, deg E, km]
const myClosestPoint = findClosestPoint(starfire, longitudes, latitudes, altitudes);


    const handlePeriodMultipler = (e) => {
        // e.preventDefault();
        setPeriodMultiplier(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setTLEData(customTLE);


    }

    let customTLE = {
        satelliteName: "",
        line1: "",
        line2: ""
    }

    const handleCustomTLE = (e) => {
        const lines = e.target.value.split('\n');
        const line1 = lines[0]?.trim();
        const line2 = lines[1]?.trim();

        customTLE = {
            satelliteName: "Custom TLE",
            line1: line1,
            line2: line2
        }
    }

    const handleBack = () => {
        navigate('/home/Satellites')
    }

    const [showAlternatives, toggleShowAlternatives] = useState(false);

    return (
<>
      <div className='assessment-container'>
        <div>
            <button className='back-button' onClick={handleBack}>Back</button>
            

            <br/>
            <div className='prop-container'>
            <label className='prop-text'>{"Propagate "}
                <input className='prop-input' type="number" value={periodMultiplier} onChange={handlePeriodMultipler} min={1} max={20}/>
                {` orbital periods`}
            </label>
            <p>T={parseFloat(period).toFixed(2)} minutes</p>

            {/* <button onClick={() => toggleShowAlternatives(!showAlternatives)}>{showAlternatives ? `Hide alternatives` : `Show alternatives`}</button> */}

            </div>

            <form onSubmit={handleSubmit}>
                <label className='prop-text'>TLE:</label>
                    <textarea defaultValue={`${TLEData.line1}\n${TLEData.line2}`} style={{height: '32px', width: '100%'}} onChange={handleCustomTLE} readOnly={false} />
                
                <button className='submit-button' type="submit">Submit</button>
            </form>

            <div className='map-container'>
            <div className='map-title'>
            <h1 className='prop-text'>{satelliteName}</h1>
            <button onClick={toggleMapType}>Toggle Map View</button>
            </div>
            <MapContainer center={[0, 0]} zoom={2} style={{ height: "50vh", width: "80vw", border: "solid black" }}>


            {mapType === 'normal' ? (
                <>
                    {/* <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    /> */}

                    <TileLayer
                    url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}"
                    attribution='&copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
                    />
                </>
                ) : (

                <>
                    <TileLayer
                        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                        attribution='&copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
                    />
                    <TileLayer
                        url="https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}"
                        attribution='&copy; Esri &mdash; Source: Esri'
                    />

                </>
                )}

                {splitPositions.map((positions, index) => (
                    <Polyline positions={positions} color='red' />
                ))}

                {/* {satelliteControlNetwork.map((position, idx) => (
                    <Marker key={idx} position={position} />
                ))} */}

                    <Marker key="starfire" position={starfire} >
                        <Popup><h4>Starfire Optical Range</h4></Popup>
                    </Marker>

                    {hasLineOfSight(starfire, [latitudes[0], longitudes[0], altitudes[0]]) &&
                    ( <Polyline positions={[starfire, [latitudes[0], longitudes[0]]]} color='blue' /> )
                    }
                    <Marker key="satellite_position" position={[latitudes[0], longitudes[0]]} icon={satelliteIcon}>
                        <Popup>
                            <h4>Current Location</h4>
                            Latitude: {latitudes[0]} °N <br/>
                            Longitude: {longitudes[0]} °E <br/>
                            Altitude: {altitudes[0]} km <br/>
                            Mountain Time: {times[0]} <br/>
                            Azimuth: {parseFloat(calculateAzimuth([starfire[0], starfire[1]], [latitudes[0], longitudes[0]]).toFixed(4))} deg from North <br/>
                            Elevation: {parseFloat(calculateElevationAngle(starfire, [latitudes[0], longitudes[0], altitudes[0]]).toFixed(4))} deg from horizontal <br/>
                            Distance: {parseFloat(calculateTotalDistance(starfire, [latitudes[0], longitudes[0], altitudes[0]]).toFixed(0))} km <br/>
                            hasLineOfSight: {hasLineOfSight(starfire, [latitudes[0], longitudes[0], altitudes[0]]).toString()}
                        </Popup>
                    </Marker>

                    {hasLineOfSight(starfire, myClosestPoint.closestPoint) &&
                    ( <Polyline positions={[starfire, myClosestPoint.closestPoint]} color='blue' /> )
                    }
                    <Marker position={myClosestPoint.closestPoint} >
                        <Popup>
                            <h4>Closest Future Location</h4>
                            Latitude: {myClosestPoint.closestPoint[0]} °N <br/>
                            Longitude: {myClosestPoint.closestPoint[1]} °E <br/>
                            Altitude: {myClosestPoint.closestPoint[2]} km <br/>
                            Mountain Time: {times[myClosestPoint.index]} <br/>
                            Azimuth: {parseFloat(calculateAzimuth([starfire[0], starfire[1]], [myClosestPoint.closestPoint[0], myClosestPoint.closestPoint[1]]).toFixed(4))} deg from North <br/>
                            Elevation: {parseFloat(calculateElevationAngle(starfire, myClosestPoint.closestPoint).toFixed(4))} deg from horizontal <br/>
                            Distance: {parseFloat(calculateTotalDistance(starfire, myClosestPoint.closestPoint).toFixed(0))} km <br/>
                            hasLineOfSight: {hasLineOfSight(starfire, myClosestPoint.closestPoint).toString()}
                        </Popup>
                    </Marker>

                    {showAlternatives &&
                    (myClosestPoint.alternativesIndices.map((i, map_index) => (
                        <Marker key={map_index} position={[latitudes[i], longitudes[i]]} >
                            <Popup>
                                <h4>Alternative Location {map_index+1}/10</h4>
                                Latitude: {latitudes[i]} °N <br/>
                                Longitude: {longitudes[i]} °E <br/>
                                Altitude: {altitudes[i]} km <br/>
                                Mountain Time: {times[i]} <br/>
                                Azimuth: {parseFloat(calculateAzimuth([starfire[0], starfire[1]], [latitudes[i], longitudes[i]]).toFixed(4))} deg from North <br/>
                                Elevation: {parseFloat(calculateElevationAngle(starfire, [latitudes[i], longitudes[i], altitudes[i]]).toFixed(4))} deg from horizontal <br/>
                                Distance: {parseFloat(calculateTotalDistance(starfire, [latitudes[i], longitudes[i], altitudes[i]]).toFixed(0))} km <br/>
                                hasLineOfSight: {hasLineOfSight(starfire, [latitudes[i], longitudes[i], altitudes[i]]).toString()}
                            </Popup>
                        </Marker>)
                        ))}



            </MapContainer>
            </div>
        </div>
</div>
</>
    );

};





// solves the meridian line problem
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




// used to calculate surface distance on the earth
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


// searches through the propagation arrays to find the target satellite closest to starfire
// in addition to keeping track of the shortestDistance and its corresponding index,
// keep the next 10 closest points by storing its indecies in an array called alternativesIndecies
// where the array is ordered from closest to furthest
function findClosestPoint(starfire, longitudes, latitudes, altitudes) {
    let distances = [];

    for (let i = 0; i < longitudes.length; i++) {
        const surfaceDistance = haversineDistance(starfire[0], starfire[1], latitudes[i], longitudes[i]);
        const altitudeDifference = Math.abs(starfire[2] - altitudes[i]);
        const totalDistance = Math.sqrt(surfaceDistance * surfaceDistance + altitudeDifference * altitudeDifference);

        distances.push({index: i, distance: totalDistance});
    }

    // Sort the distances array in ascending order of distance
    distances.sort((a, b) => a.distance - b.distance);

    let closestPointIndex = distances[0].index;
    let shortestDistance = distances[0].distance;

    // Get the indices of the next 10 closest points
    let alternativesIndices = distances.slice(1, 11).map(d => d.index);

    return {
        closestPoint: [latitudes[closestPointIndex], longitudes[closestPointIndex], altitudes[closestPointIndex]],
        index: closestPointIndex,
        shortestDistance: shortestDistance,
        alternativesIndices: alternativesIndices
    };
}



// calculateTotalDistance calculates the distance between starfire and the satellite
function calculateTotalDistance(starfire, [longitude, latitude, altitude]) {
    const surfaceDistance = haversineDistance(starfire[0], starfire[1], latitude, longitude);
    const altitudeDifference = Math.abs(starfire[2] - altitude);
    const totalDistance = Math.sqrt(surfaceDistance * surfaceDistance + altitudeDifference * altitudeDifference);
    return totalDistance;
}





// calculates the azimuth angle between starfire and the target satellite
function calculateAzimuth([lat1, lon1], [lat2, lon2]) {
    function toRadians(degrees) {return degrees * Math.PI / 180;}
    function toDegrees(radians) {return radians * 180 / Math.PI;}

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

    return bearing; // in degrees from north
}



function calculateElevationAngle([lat1, lon1, alt1], [lat2, lon2, alt2]) {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    const los = Math.sqrt((alt1 + R) ** 2 + (alt2 + R) ** 2 - 2 * (alt1 + R) * (alt2 + R) * Math.cos(c));

    const B = Math.acos(((alt1 + R) ** 2 + los ** 2 - (alt2 + R) ** 2) / (2 * (alt1 + R) * los));

    const B_deg = B * 180 / Math.PI;

    const elevationAngle = B_deg - 90;

    return elevationAngle;
}



function hasLineOfSight([lat1, lon1, alt1], [lat2, lon2, alt2]) {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    const d = R * c; // Distance between points in km, (this is haversine distance)
    console.log("d", d);
    // const d2 = haversineDistance(lat1, lon1, lat2, lon2);
    // console.log("d2", d2);


    // Calculate the line of sight distance (this is law of cosines, is this valid?)
    const los = Math.sqrt((alt1 + R) ** 2 + (alt2 + R) ** 2 - 2 * (alt1 + R) * (alt2 + R) * Math.cos(c));

    return d <= los;
}