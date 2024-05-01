import React, { useState, useContext } from 'react';
import './Nav.css'
import { Link, useMatch, useResolvedPath, useNavigate, Outlet } from 'react-router-dom';
import { IoIosArrowDown, IoIosArrowUp, IoIosMenu } from "react-icons/io";
// import styled from 'styled-components'

import { TfiMenu } from "react-icons/tfi"

// const DropdownContent = styled.div`
//   display: ${props => (props.isOpen ? 'block' : 'none')};
//   position: absolute;
//   background-color: #f9f9f9;
//   min-width: 160px;
//   border: 1px solid black;
//   z-index: 1;
// `;

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleMouseLeave = () => {
    // Check if the mouse is not over either the button or the dropdown
    if (!document.querySelector('.create-button:hover') && !document.querySelector('.dropdown:hover')) {
      setIsOpen(false);
    }
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  const viewDetails = () => {
    navigate('/search')
  }

  const viewGroundTrack = () => {
    navigate('/satellites')
  }

  return (
    <div className='navbar'>
      <TfiMenu className='hamburger'/>
      <div className='linkcontainer'>
        <div onMouseLeave={handleMouseLeave} style={{ position: 'relative' }}>
          <span class='create-button' onClick={handleToggle} style={{ position: 'relative' }}>
            Create {isOpen ? <IoIosArrowUp/> : <IoIosArrowDown/>}
          </span>
          {isOpen && (
            <div className='dropdown' style={{ bottom: 'calc(100% + 5px)', left: 0 }}>
              <Link to="/CreateAssessment" onClick={handleLinkClick}>Create Assessment</Link>
              <Link to="/CreateNewSatellite" onClick={handleLinkClick}>Create Satellite</Link>
            </div>
          )}
          </div>
          <p onClick={viewDetails}>View</p>
          <p onClick={viewGroundTrack}>Ground-Track</p>
          <p>Satellite Orbit</p>
      </div>
      <p className='title'>Satellite Assessment Center</p>
      <input type="search" className='searchbar' placeholder='Search for a Satellite or Assessment'></input>
      
    </div>
  )
}