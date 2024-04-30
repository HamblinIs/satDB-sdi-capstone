import React from 'react';
import {useState} from 'react';
import ImageViewer from './ImageViewer';
import styled from 'styled-components';

const BackgroundDiv = styled.div`
display: flex;
flex-flow: column;
justify-content: center;
justify-items: center;
align-items: center;
align-content: center;
background-color: #c4cfff;
width: 500px;
border: 4px solid #4a478a;
margin-top: 20px;
padding: 20px;
`

const CenterDiv = styled.div`
display: flex;
flex-flow: column;
justify-content: center;
justify-items: center;
align-items: center;
align-content: center;
`

const StyledButton = styled.button`
  display: flex;
  justify-content:center;
  justify-items:center;
  align-items:center;
  align-content:center;
  color: #081448;
  border-radius: 3px;
  border: 2px solid black;
  background-color: #96a6ef;
  width: 125px;
  height: 35px;
  font-weight: bold;
`

const ButtonsDiv = styled.div`
  display: flex;
  flex-flow:row;
  justify-content:center;
  justify-items:center;
  align-items:center;
  align-content:center;
  gap: 10px;
`

const ULDiv = styled.ul`
  justify-items: left;
  justify-content: left;
  align-items: left;
  align-content: left;
  list-style: circle;
  li {
    justify-items: left;
    justify-content: left;
    align-items: left;
    align-content: left;
    margin-bottom: 8px;
  }
`

const imagesArr = ["https://cdn.defenseone.com/media/img/cd/2023/08/11/GettyImages_1407240226/open-graph.jpg", "https://spaceplace.nasa.gov/satellite/en/TEMPO.en.jpg", "https://media.istockphoto.com/id/1339097795/photo/satellite-orbiting-the-earth.jpg?s=612x612&w=0&k=20&c=FMG2NypIT0JuZVs26qSYOq2qTwsO89woydrwZimK21s="];

const starfireImages = [
  'https://afresearchlab.com/wp-content/uploads/2021/07/150505-F-ZZ999-001-scaled.jpeg',
  'https://img.atlasobscura.com/T89QKcO5QIHXCyTjPIfmeX-ErbTPC3Zqn4gstgGTYcw/rt:fit/h:390/q:81/sm:1/scp:1/ar:1/aHR0cHM6Ly9hdGxh/cy1kZXYuczMuYW1h/em9uYXdzLmNvbS91/cGxvYWRzL3BsYWNl/X2ltYWdlcy8zMDg3/YzI0ODljMmEyOWM5/ZDNfU3RhcmZpcmVf/T3B0aWNhbF9SYW5n/ZV8tX3RocmVlX2xh/c2Vyc19pbnRvX3Nw/YWNlLmpwZw.jpg',
  // 'https://afresearchlab.com/wp-content/uploads/2021/07/SOR-3.jpg',
  'https://img.atlasobscura.com/RSXx8ZWqYy2vN3yR8AnV_JZcHW3d4tVohmaUNG8wG5o/rt:fit/h:390/q:81/sm:1/scp:1/ar:1/aHR0cHM6Ly9hdGxh/cy1kZXYuczMuYW1h/em9uYXdzLmNvbS91/cGxvYWRzL3BsYWNl/X2ltYWdlcy9kM2U0/ZjNiOTQ4MWFlMmU5/YWRfMTQwMjEwLUYt/Wlo5OTktMDAxLkpQ/Rw.jpg',
  'https://img.atlasobscura.com/W8mmTWAgBbAxc2XO9NxZRArqUnjqbWhQeCBpUfD90co/rt:fit/h:390/q:81/sm:1/scp:1/ar:1/aHR0cHM6Ly9hdGxh/cy1kZXYuczMuYW1h/em9uYXdzLmNvbS91/cGxvYWRzL3BsYWNl/X2ltYWdlcy83YjE3/MzEwZTUyMjE0N2Y2/Y2JfU3RhcmZpcmUu/anBn.jpg',
  'https://img.atlasobscura.com/_3VYc4BqBnkjrrxblMN42pRhEk38J3xMeo2rIj-qQpI/rt:fit/h:390/q:81/sm:1/scp:1/ar:1/aHR0cHM6Ly9hdGxh/cy1kZXYuczMuYW1h/em9uYXdzLmNvbS91/cGxvYWRzL3BsYWNl/X2ltYWdlcy85MjEw/YTc3YzEyOTQwZTdm/NzVfMDkwMzA5LUYt/MDAwMVctOTA0LkpQ/Rw.jpg',
  // 'https://media.defense.gov/2024/Feb/22/2003398383/-1/-1/0/240222-F-EK582-1000.JPG'
]

const WelcomePage = () =>{

  const [info, setInfo] = useState(0);

  return(
    <CenterDiv>
      <BackgroundDiv>
        <h2>WELCOME</h2>
        <ButtonsDiv>
          <StyledButton onClick={() => setInfo(1)}>App Instructions</StyledButton>
          <StyledButton onClick={() => setInfo(2)}>SOR Information</StyledButton>
        </ButtonsDiv>
        {info ===1 ?
        <>
         <h3>Search Satellites/Assessments:</h3>
         <ULDiv>
          <li>Choose category you wish to search through and type in the name of the satellite/assessment.</li>
          <li>If you wish to view all satelittes/assessments click search without typing in a name.</li>
          <li> Once results populate, click the "Details" button to view the full information of the desired satellite/assessment.</li>
        </ULDiv>

        <br/>
        <h3>Create Satellites/Assessments:</h3>
        <li> Must be logged in with user account to create a satellite/assessment. </li>
        <li>Click feature and fill out form, all file data should be the file paths of the associated files.</li>

         <br/>
         <h3>Celestrak Data: </h3>
         <li>View through pages of Celestrak Satellite Data using the page navigation buttons. </li>
         <li>Click the "Ground Track" button of the desired satellite to view the map view of the ground track. </li>
         <li>Click the "Toggle Map View" to change to a satellite view. </li>
         <li>By default, this feature will show 1 orbital period, change this by entering the desired amount of orbital periods. </li>
         <li>Click "Show Alternatives" to view alternate data points for the ground track.</li>
         <li>Customize the Two Line Element (TLEs) by editing the text box.</li>
         </>
      : info === 2 ?
      <>
        <h3>Starfire Optical Range</h3>
      <p>As part of AFRL’s Directed Energy, Space Electro-Optics Division, the Starfire Optical Range (SOR) is a vital resource in achieving the Department of the Air Force’s mission to operate freely in space.This world-class research facility is located on a hilltop 1,900 meters (6,240 feet) above sea level on Kirtland Air Force Base, New Mexico. SOR’s primary mission is to develop optical sensing, imaging, and atmospheric compensation technologies to support aerospace missions.</p>
      <p>The SOR operates one of the world’s premier telescopes capable of tracking low-earth orbiting satellites. It has a 3.5-meter (11.5-feet) diameter primary mirror and is protected by a retracting cylindrical enclosure that allows the telescope to operate in the open air. Using adaptive optics, the telescope can distinguish basketball-sized objects at a distance of 1,600 kilometers (1,000 miles) into space. In addition to the 3.5-meter telescope, the SOR includes four other optical mounts: a 1.5-meter telescope, two 1.0-meter telescopes, and a 1.0-meter laser beam director. All are capable of tracking low-earth orbit satellites and most are equipped with high performance adaptive optics systems and highly sensitive scientific cameras.</p>
      </>
      :
      <></>
        }




        <ImageViewer images={starfireImages}/>
      </BackgroundDiv>
    </CenterDiv>
  )
}

export default WelcomePage;