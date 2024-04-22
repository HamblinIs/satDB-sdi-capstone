import React from 'react';

export default function SatelliteDetails() {
  // Replace the following state with actual data fetched from API
  const satellite = {
    name: 'some satellite',
    twoLineElement: '1 25544U 98067A   21275.58693519  .00001303  00000-0  25332-4 0  9991',
    orbitalPeriod: '92.69 minutes',
    missionType: 'scientific/experimental',
    missionDesignLife: '15 years',
    expectedRetirementDate: '2023-11-20'
  };

  return (
    <div>
      <h1>Satellite Details</h1>

        <label>Satellite Name:</label>
        <br />
        <p>{satellite.name}</p>
        <br />
        <label>Satellite Id:</label>
        <br />
        <p>{satellite.OBJECT_ID}</p>
        <br />
        <label>Two-line Element:</label>
        <br />
        <p>{satellite.twoLineElement}</p>
        <br />
        <label>Orbital Period:</label>
        <br />
        <p>{satellite.orbitalPeriod}</p>
        <br />
        <label>Mission Type:</label>
        <br />
        <p>{satellite.missionType}</p>
        <br />
        <label>Mission Design Life:</label>
        <br />
        <p>{satellite.missionDesignLife}</p>
        <br />
        <label>Expected Retirement Date:</label>
        <br />
        <p>{satellite.expectedRetirementDate}</p>
    </div>
  );
}
