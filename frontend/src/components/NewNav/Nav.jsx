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

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };


  return (
    <div className='navbar'>
      <TfiMenu className='hamburger'/>
      <div className='linkcontainer'>
            <button className='button3' onMouseOver={handleToggle} onMouseLeave={handleMouseLeave}>
              Create {isOpen ? <IoIosArrowUp/> : <IoIosArrowDown/>}
            </button>
            <div isOpen={isOpen}>
              <Link to="CreateAssessment" onClick={handleLinkClick}>Create Assessment</Link>
              <Link to="CreateNewSatellite" onClick={handleLinkClick}>Create Satellite</Link>
            </div>
          <p>View</p>
          <p>Ground-Track</p>
          <p>Satellite Orbit</p>
      </div>
      <p className='title'>Satellite Assessment Center</p>
      <input type="search" className='searchbar' placeholder='Search for a Satellite or Assessment'></input>
      
    </div>
  )
}