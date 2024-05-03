import React, { useState, useContext } from 'react';
import './Nav.css'
import { Link, useMatch, useResolvedPath, useNavigate, Outlet } from 'react-router-dom';
import { IoIosArrowDown, IoIosArrowUp, IoIosMenu } from "react-icons/io";
import { UserContext } from '../../App.js'
// import styled from 'styled-components'

import { TfiMenu } from "react-icons/tfi"
import { FaHome } from "react-icons/fa"

// const DropdownContent = styled.div`
//   display: ${props => (props.isOpen ? 'block' : 'none')};
//   position: absolute;
//   background-color: #f9f9f9;
//   min-width: 160px;
//   border: 1px solid black;
//   z-index: 1;
// `;



export default function Nav( { setCategory, setSearchBarInput } ) {
  const [isOpen, setIsOpen] = useState(false);
  const [ openMenu, setOpenMenu ] = useState(false);
  let { activeUser, setActiveUser } = React.useContext(UserContext);

  const navigate = useNavigate();

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  // const handleMouseLeave = () => {
  //   // Check if the mouse is not over either the button or the dropdown
  //   if (!document.querySelector('.create-button:hover') && !document.querySelector('.dropdown:hover')) {
  //     setIsOpen(false);
  //   }
  // };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  const viewDetails = () => {
    navigate('search')
  }

  const viewGroundTrack = () => {
    navigate('Satellites')
  }

  const handleOpen = () => {
    setOpenMenu(!openMenu)
  }

  const handleLogOut = () => {
    setIsOpen(false);
    setActiveUser({});
  };

  const handleHome = () => {
    setCategory('assessments');
    setSearchBarInput('');
    navigate('SatelliteResults')
  }


  let tempSearchBarInput = '';
  const handleSubmitSearch = (e) => {
    e.preventDefault();
    setSearchBarInput(tempSearchBarInput.trim());
    navigate('SatelliteResults');
  }

  return (
    <div className='navbar'>
      {/* TITLE DIV */}
      <p className='title' onClick={handleHome}>Satellite Assessment Center</p>
      {/* SEARCH DIV */}
        <form onSubmit={handleSubmitSearch}>
          <input type="search" className='searchbar' placeholder='Search...' onChange={e => tempSearchBarInput = e.target.value}></input>
        </form>
      {/* RADIO DIV */}
        
          <div className='category-select'>
          <form className='radio' onChange={e => setCategory(e.target.value)}>
              <div className='selection'>
                <input id="assess" type="radio" value="assessments" name="search_category" defaultChecked />
                <label for="assess">Assessments</label>
              </div>
              <div className='selection'>
                <input id="sat" type="radio" value="satellites" name="search_category" />
                <label for="sat">Satellites</label>
              </div>
          </form>
          </div>
        {/* <form className='radio' onChange={e => setCategory(e.target.value)}>
          <label>
            <input type="radio" value="satellites" name="search_category" defaultChecked /> Satellites
          </label>
          <label>
            <input type="radio" value="assessments" name="search_category" /> Assessments
          </label>
        </form> */}
      {/* LINK/Create DIV */}
      <div className='linkcontainer'>
      {activeUser.email ? (
            <div class="dropdown">
              <p class="dropbtn">Create</p>
              <div class="dropdown-content">
                <Link to="CreateAssessment" onClick={handleLinkClick}>Create Assessment</Link>
                <Link to="CreateNewSatellite" onClick={handleLinkClick}>Create Satellite</Link>
              </div>
            </div>
      ) : ([])}
          <p onClick={viewGroundTrack}>Ground-Track</p>
          <p onClick={() => navigate('SatelliteModelOrbit')}>Satellite Orbit</p>
          {!activeUser.email ? (
          <Link to="Login" className="login" onClick={handleLinkClick}>Login</Link>
        ) : ([]) }
        {activeUser.email ? (
          <Link to=""  className="login" onClick={handleLogOut}>Logout</Link>
        ) : ([]) }
      </div>
    </div>
  )
}