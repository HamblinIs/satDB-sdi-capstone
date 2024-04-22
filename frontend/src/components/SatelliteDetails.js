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

      <form>

        <label>Satellite Name:
          <input type="text" value={satellite.OBJECT_NAME} readOnly />
        </label>

        <label>Satellite Id:
          <input type="text" value={satellite.OBJECT_ID} readOnly />
        </label>

        <label>Two-line Element:
          <input type="text" value={satellite.twoLineElement} readOnly />
        </label>

        <label>Orbital Period:
          <input type="text" value={satellite.orbitalPeriod} readOnly />
        </label>

        <label>Mission Type:
          <input type="text" value={satellite.missionType} readOnly />
        </label>

        <label>Mission Design Life:
          <input type="text" value={satellite.missionDesignLife} readOnly />
        </label>

        <label>Expected Retirement Date:
          <input type="text" value={satellite.expectedRetirementDate} readOnly />
        </label>

      </form>
    </div>
  );
}
