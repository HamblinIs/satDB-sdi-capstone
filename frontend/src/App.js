import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './components/HomePage';
import AssessmentDetails from './components/AssessmentDetails';
import SatelliteDetails from './components/SatelliteDetails';
import CreateSatellite from './components/CreateSatellite';
import CreateAssessment from './components/CreateAssessment';
import CreateAccountLogin from './components/CreateAccountLogin';
import SatelliteModelOrbit from './components/SatelliteModelOrbit';
import AccountRequestViewer from './components/AccountRequestViewer';
import Satellites from './components/Satellites';
import SatelliteGroundTrack from './components/SatelliteGroundTrack';
import { useState, createContext } from 'react';
import Navbar from './components/Navbar'

export const UserContext = createContext();

function App() {

  const [ activeUser, setActiveUser ] = useState({});

  return (
    <div className="App">
    <Router>
      <UserContext.Provider value={{activeUser, setActiveUser}}>
      <Navbar />

      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/login" element={<CreateAccountLogin />} />
        <Route path="/CreateAssessment" element={<CreateAssessment />} />
        <Route path="/CreateSatellite" element={<CreateSatellite />} />
        <Route path="/SatelliteModelOrbit" element={<SatelliteModelOrbit />} />
        <Route path="/AccountRequestViewer" element={<AccountRequestViewer />} />
        <Route path="/AssessmentDetails/:id" element={<AssessmentDetails />} />
        <Route path="/SatelliteDetails/:id" element={<SatelliteDetails />} />
        <Route path="/Satellites" element={<Satellites />} />
        <Route path="/SatelliteGroundTrack" element={<SatelliteGroundTrack/>} />
      </Routes>


      </UserContext.Provider>
      </Router>
    </div>
  );
}

export default App;
