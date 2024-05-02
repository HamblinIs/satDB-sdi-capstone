import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import Nav  from '../components/NewNav/Nav';
import Login from '../components/NewLogin/Login';
import ImageViewer from '../components/ImageViewer'
import NewCreateSatellite from '../components/NewCreateSatellites/CreateNewSatellite';
import './MainPage.css';


export default function MainPage( { setCategory, setSearchBarInput } ) {
  return (
    <div className='main-page'>
      {/* <nav> */}

        {/* <ul>
          <li><Link to="login" >login</Link></li>
          <li><Link to="search" >search</Link></li>
          <li><Link to="CreateAssessment" >CreateAssessment</Link></li>
          <li><Link to="CreateNewSatellite" >CreateNewSatellite</Link></li>
          <li><Link to="AssessmentDetails/1" >AssessmentDetails</Link></li>
          <li><Link to="SatelliteDetails/1" >SatelliteDetails</Link></li>
          <li><Link to="Satellites" >Celestrak</Link></li>
          <li><Link to="SatelliteModelOrbit" >SatelliteModelOrbit</Link></li>
          <li><Link to="SatelliteResults" >SatelliteResults</Link></li>

        </ul>
      </nav> */}


      <Nav setCategory={setCategory} setSearchBarInput={setSearchBarInput} />
      <div>
          <Outlet/>
        </div>
      {/* <NewCreateSatellite/> */}

    </div>
  )
}