import React from 'react';
import Nav  from '../components/NewNav/Nav';
import Login from '../components/NewLogin/Login';
import NewCreateSatellite from '../components/NewCreateSatellites/CreateNewSatellite';


export default function MainPage() {
  return (
    <div>
      <Nav/>

      <NewCreateSatellite/>
    </div>
  )
}