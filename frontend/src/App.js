import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import HomePage from './components/HomePage';
import AssessmentDetails from './components/AssessmentDetails';
import SatelliteDetails from './components/SatelliteDetails';
import CreateSatellite from './components/CreateSatellite';
import CreateAssessment from './components/CreateAssessment';
import CreateAccountLogin from './components/CreateAccountLogin';
import SatelliteModelOrbit from './components/SatelliteModelOrbit';
import AccountRequestViewer from './components/AccountRequestViewer';

function App() {
  return (
    <div className="App">



      <nav><ul>
        <li><Link to="/">Home Page</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/CreateAssessment">Create Assessment</Link></li>
        <li><Link to="/CreateSatellite">Create Satellite</Link></li>
        <li><Link to="/SatelliteModelOrbit">SatelliteModelOrbit</Link></li>
        <li><Link to="/AccountRequestViewer">AccountRequestViewer</Link></li>
        </ul></nav>



      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/login" element={<CreateAccountLogin />} />
        <Route path="/CreateAssessment" element={<CreateAssessment />} />
        <Route path="/CreateSatellite" element={<CreateSatellite />} />
        <Route path="/SatelliteModelOrbit" element={<SatelliteModelOrbit />} />
        <Route path="/AccountRequestViewer" element={<AccountRequestViewer />} />
        <Route path="/AssessmentDetails/:id" element={<AssessmentDetails />} />
        <Route path="/SatelliteDetails/:id" element={<SatelliteDetails />} />
      </Routes>
      


    </div>
  );
}

export default App;
