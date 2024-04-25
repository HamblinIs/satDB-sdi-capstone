import React from 'react';
import ImageViewer from './ImageViewer';
import styled from 'styled-components';


const CenterDiv = styled.div`
display: flex;
flex-flow: column;
justify-content: center;
justify-items: center;
align-items: center;
align-content: center;
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

  return(
    <CenterDiv>
    <ImageViewer images={starfireImages}/>
    </CenterDiv>
  )
}

export default WelcomePage;