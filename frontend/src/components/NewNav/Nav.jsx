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

    <>

    <div className='navbar'>

      <TfiMenu className='hamburger' onClick={handleOpen} style={{ position: 'relative' }}/>
      {openMenu && (
            <div className='dropdown' style={{ left: '20px', left: 0 }}>
              {activeUser.email ? (
                <Link to="/home/SatelliteResults" onClick={handleLogOut}>Logout</Link>
              ) : (
                <Link to="Login" onClick={handleLinkClick}>Login</Link>
              )}
            </div>
          )}

      <div className='linkcontainer'>
      {activeUser.email ? (
        <div style={{ position: 'relative' }}>
          <span className='create-button' onClick={handleToggle} style={{ position: 'relative' }}>
            Create {isOpen ? <IoIosArrowUp/> : <IoIosArrowDown/>}
          </span>
          {isOpen && (
            <div className='dropdown' style={{ top: '40px', left: 0 }}>
              <Link to="CreateAssessment" onClick={handleLinkClick}>Create Assessment</Link>
              <Link to="CreateNewSatellite" onClick={handleLinkClick}>Create Satellite</Link>
            </div>
          )}
          </div>
      ) : (
        <div>
        </div>
      )}
          <p className='pointer' onClick={viewGroundTrack}>Ground-Track</p>
          <p className='pointer' onClick={() => navigate('SatelliteModelOrbit')}>Satellite Orbit</p>
          <FaHome className='home' onClick={handleHome} style={{ position: 'relative' }}/>
      </div>
      <p className='title'>Satellite Assessment Center</p>


      <form onSubmit={handleSubmitSearch}>
        <input type="search" className='searchbar' placeholder='Search...' onChange={e => tempSearchBarInput = e.target.value}></input>
      </form>

      <br/>

      <form onChange={e => setCategory(e.target.value)}>
        <label>
          <input type="radio" value="assessments" name="search_category" defaultChecked /> Assessments
        </label>
        <label>
          <input type="radio" value="satellites" name="search_category" /> Satellites
        </label>
      </form>



    </div>
    </>
  )

}