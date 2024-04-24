import React, { useState } from 'react';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';
import styled from 'styled-components';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";


const HeaderStyle = styled(Link)`
  background-color: black;
  font-size: 50px;
  color: white;
  width: 100%;
  top: 50%;
  transform: translateY(-50%);
  z-index: 20;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  text-align: center;
  margin-top: 25px;
  text-decoration: none;
`;

const NavUL = styled.ul`
  background-color: #96a6ef;
  padding: 0;
  margin: 0;
  list-style: none;
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: center;
`


const NavLink = styled(Link)`
color: inherit;
text-decoration: none;
height: 100%;
display: flex;
align-items: center;
padding: .25rem;
`;

const ListItem = styled.li`
background-color: ${props => props.isActive ? '#555' : 'transparent'};
&:hover {
  background-color: #777;
}
`;


const DropdownMenu = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownButton = styled.button`
  background-color: #96a6ef;
  color: black;
  padding: 10px;
  font-size: 16px;
  border: none;
  cursor: pointer;
`;

const DropdownContent = styled.div`
  display: ${props => (props.isOpen ? 'block' : 'none')};
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  z-index: 1;
`;

const DropdownLink = styled(Link)`
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  &:hover {
    background-color: #f1f1f1;
  }
`;



export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  const handleLinkClick = () => {
    setIsOpen(false)
  }

  return (
    <>
    <HeaderStyle to='/'>
      Satellite Assessment Center
    </HeaderStyle>
    <NavUL>
      {/* <CustomLink to='/'>Home</CustomLink> */}
      {/* <CustomLink to='/CreateAssessment'>Create Assessment</CustomLink>
      <CustomLink to='/CreateSatellite"'>Create Satellite</CustomLink> */}
      <DropdownMenu>
        <DropdownButton onClick={handleToggle}>
          Create {isOpen ? <IoIosArrowUp/> : <IoIosArrowDown/>}
          </DropdownButton>

          <DropdownContent isOpen={isOpen}>
           <DropdownLink to="/CreateAssessment" onClick={handleLinkClick}>Create Assessment</DropdownLink>
            <DropdownLink to="/CreateSatellite" onClick={handleLinkClick}>Create Satellite</DropdownLink>
            {/* <DropdownLink to="/Satellites" onClick={handleLinkClick}>View Satellites</DropdownLink>
            <DropdownLink to="/SatelliteModelOrbit" onClick={handleLinkClick}>Satellite Model Orbit</DropdownLink>
             <DropdownLink to="/SatelliteGroundTrack">Satellite Ground Track</DropdownLink> */}
          </DropdownContent>
      </DropdownMenu>
      <CustomLink to='/SatelliteModelOrbit'>Satellite Model Orbit</CustomLink>
      <CustomLink to='/Satellites'>View Satellites</CustomLink>
      <CustomLink to='/SatelliteGroundTrack'>Satellite Ground Track</CustomLink>
    </NavUL>

    </>
  )
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to)
  const isActive = useMatch({ path: resolvedPath.pathname, end: true })

  return (
    <ListItem isactive={isActive}>
      <NavLink to={to} {...props}>
        {children}
      </NavLink>
    </ListItem>
  )
}

