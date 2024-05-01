import './App.css';
import { BrowserRouter as Router, Routes, Route, Link, Outlet } from 'react-router-dom';
import HomePage from './components/HomePage';
import AssessmentDetails from './components/NewAssessmentDetails/NewAssessmentDetails';
import SatelliteDetails from './components/NewSatelliteDetails/NewSatelliteDetails';
import CreateSatellite from './components/CreateSatellite';
import CreateAssessment from './components/CreateAssessment/CreateAssessment'
import CreateAccountLogin from './components/CreateAccountLogin';
import SatelliteModelOrbit from './components/SatelliteModelOrbit';
import AccountRequestViewer from './components/AccountRequestViewer';
import Satellites from './components/Satellites';
import SatelliteGroundTrack from './components/SatelliteGroundTrack';
import WelcomePage from './components/WelcomePage'
import { useState, createContext } from 'react';
import Navbar from './components/Navbar';
import styled from 'styled-components';
import MainPage from './routes/MainPage'
import Login from './components/NewLogin/Login'
import Background from './routes/Background'
import CreateNewSatellite from './components/NewCreateSatellites/CreateNewSatellite'
import Celestrak from './components/NewSatellites/Celestrak'
import NewGroundTrack from './components/NewGroundTrack/NewGroundTrack'
import Parallax from './components/Paralax/Parallax'

import SatelliteResults from './components/SearchResults/SatelliteResults'

export const UserContext = createContext();


// const BackgroundDiv = styled.div`
//   background-image: url('https://images.hdqwalls.com/download/space-art-minimal-na-1920x1080.jpg');
//   width: 100%;
//   height: 100%;
//   `
  // const BackgroundDiv2 = styled.div`
  // background-image: url('https://images.hdqwalls.com/download/space-art-minimal-na-1920x1080.jpg');
  // width: 100%;
  // height:1000px;
  // transform: scaleY(-1);
  // `


function App() {

  const [ activeUser, setActiveUser ] = useState({});

  const [ TLEData, setTLEData] = useState({});

  return (
    <>
      <div className="App">
        <Router>
          <UserContext.Provider value={{activeUser, setActiveUser}}>
            {/* <Navbar /> */}
            <Routes>
              <Route exact path ="/" element={<Parallax />} />
              <Route exact path ="/home" element={<MainPage />} >
                <Route path="login" element={<Login />} />
                <Route path="search" element={<HomePage />} />
                <Route path="CreateAssessment" element={<CreateAssessment />} />
                <Route path="CreateNewSatellite" element={<CreateNewSatellite />} />
                <Route path="AssessmentDetails/:id" element={<AssessmentDetails />} />
                <Route path="SatelliteDetails/:id" element={<SatelliteDetails />} />
                <Route path="Satellites" element={<Celestrak setTLEData={setTLEData} />} />
                <Route path="NewGroundTrack" element={<NewGroundTrack setTLEData={setTLEData} TLEData={TLEData} />} />
              </Route>
              
              
              <Route path="/SatelliteModelOrbit" element={<SatelliteModelOrbit />} />
              <Route path="/AccountRequestViewer" element={<AccountRequestViewer />} />
              
              
              
              <Route exact path ="/Background" element={<Background />} />
              <Route exact path ="/SatelliteResults" element={<SatelliteResults />} />
            </Routes>
          </UserContext.Provider>
        </Router>
      </div>
    </>
  );
}

export default App;
