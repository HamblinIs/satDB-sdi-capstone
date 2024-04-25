import React, { useState, useContext } from 'react';
import { Link, useMatch, useResolvedPath, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { IoIosArrowDown, IoIosArrowUp, IoIosMenu } from "react-icons/io";
import { UserContext } from '../App.js'
import CreateAccountLogin from './CreateAccountLogin';

//ihamblin@yahoo.com
//Password123

const HeaderStyle = styled(Link)`
background-color: black;
font-size: 50px;
color: white;
width: 100%;
z-index: 20;
display: flex;
justify-content: center;
align-items: center;
padding: 10px;
margin-top: 25px;
margin-bottom: 10px;
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
  margin-bottom: 10px;
`

const NavbarLink = styled.div`
  color: white;
  font-size: 15px; // Fixed font size
`;

const NavLink = styled(Link)`
  color: inherit;
  text-decoration: none;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0.25rem;
  font-size: 15px; // Fixed font size
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
  cursor: pointer;
`;

const DropdownContent = styled.div`
  display: ${props => (props.isOpen ? 'block' : 'none')};
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  border: 1px solid black;
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

const NavbarDropDown = styled.div`
  margin-right: 1rem;
`
const NavbarButton = styled.div`
color: white;
display: flex;
justify-content: flex-end;
align-items: center;
background-color: transparent;
border: none;
cursor: pointer;
`;


const HeaderLinkContainer = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-grow: 1;
`

const HeaderLink = styled(Link)`
text-decoration: none;
color: white;
font-size: 50px;
display: flex;
align-items: center;
`;

const LoginContainer = styled.div`
text-decoration: none;
color: white;
font-size: 12px;
background-color:black
cursor:pointer;
`

const InitialsContainer = styled.div`
  background-color: #fff;
  color: purple;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  z-index: 1;
`;

const CircleContainer = styled.div`
  position: relative;
  width: 40px;
  height: 60px;
  border-radius: 50%;
  background-color: #000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LoggedInContainer = styled.div`
  display: flex;
  align-items: center;
`;

const LogoutButton = styled.button`
  background-color: transparent;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 12px;
  margin-top: 4px;
`;

export default function Navbar() {
  const navigate = useNavigate();

  const { activeUser, setActiveUser } = React.useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);
  const [showLoginModel, setShowLoginModal] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  const toggleLoginModel = () => {
    navigate('/login');
  };

  const handleSignOut = () => {
    setActiveUser({});
    navigate('/');
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  return (
    <>
      <HeaderStyle>
        <HeaderLinkContainer>
          <HeaderLink to="/">Satellite Assessment Database</HeaderLink>
        </HeaderLinkContainer>

        <LoginContainer>
          {activeUser.email ? (
            <LoggedInContainer>
              <CircleContainer>
                <InitialsContainer>
                  {`${activeUser.first_name.charAt(0)}${activeUser.last_name.charAt(0)}`}
                </InitialsContainer>
                <LogoutButton onClick={handleSignOut}>Logout</LogoutButton>
              </CircleContainer>
            </LoggedInContainer>
          ) : (
            <NavLink to="/login">Login/Register</NavLink>
          )}
        </LoginContainer>
      </HeaderStyle>

    <NavUL>
      <CustomLink to='/search'>Search</CustomLink>
        {activeUser.email && (
          <DropdownMenu onMouseLeave={handleMouseLeave}>
            <DropdownButton onMouseOver={handleToggle}>
              Create {isOpen ? <IoIosArrowUp/> : <IoIosArrowDown/>}
            </DropdownButton>
            <DropdownContent isOpen={isOpen}>
              <DropdownLink to="/CreateAssessment" onClick={handleLinkClick}>Create Assessment</DropdownLink>
              <DropdownLink to="/CreateSatellite" onClick={handleLinkClick}>Create Satellite</DropdownLink>
            </DropdownContent>
          </DropdownMenu>
        )}

      <CustomLink to='/SatelliteModelOrbit'>Satellite Model Orbit</CustomLink>
      <CustomLink to='/Satellites'>Celestrak Data</CustomLink>
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

