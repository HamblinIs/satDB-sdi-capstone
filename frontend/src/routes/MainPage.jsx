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

      <Nav setCategory={setCategory} setSearchBarInput={setSearchBarInput} />
      <div style={{padding: "35px", height: "100%", alignItems: "center"}}>
          <Outlet/>
      </div>

    </div>
  )
}