import React from 'react';
import Nav  from '../components/NewNav/Nav';
import Login from '../components/NewLogin/Login';
import ImageViewer from '../components/ImageViewer'
import NewCreateSatellite from '../components/NewCreateSatellites/CreateNewSatellite';
import './MainPage.css'


export default function MainPage() {
  return (
    <div className='nav'>

      <Nav/>
      <div className='images'>
        <ImageViewer />
      </div>


    </div>
  )
}