import React from 'react'
import './Nav.css'
import { TfiMenu } from "react-icons/tfi"

export default function Nav() {
  return (
    <div className='navbar'>
      <TfiMenu className='hamburger' />
      <div className='linkcontainer'>
          <p>Create</p>
          <p>View</p>
          <p>Ground-Track</p>
          <p>Satellite Orbit</p>
      </div>
      <p className='title'>Satellite Assessment Center</p>
      <input type="search" className='searchbar' placeholder='Search for a Satellite or Assessment'></input>
    </div>
  )
}