import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import Moon from './moon.png';
import BackgroundSky from './background.png';
import midground from './midground.png';
import foreground from './foreground.png';
import StarFire from './starfire.png';
import Satellite from './satellite.png';
import Satellite2 from './satellite.png';
import ImageViewer from '../ImageViewer';

const BackgroundParallax = () => {
  const navigate = useNavigate();

  const starfireImages = [
    'https://afresearchlab.com/wp-content/uploads/2021/07/150505-F-ZZ999-001-scaled.jpeg',
    'https://img.atlasobscura.com/T89QKcO5QIHXCyTjPIfmeX-ErbTPC3Zqn4gstgGTYcw/rt:fit/h:390/q:81/sm:1/scp:1/ar:1/aHR0cHM6Ly9hdGxh/cy1kZXYuczMuYW1h/em9uYXdzLmNvbS91/cGxvYWRzL3BsYWNl/X2ltYWdlcy8zMDg3/YzI0ODljMmEyOWM5/ZDNfU3RhcmZpcmVf/T3B0aWNhbF9SYW5n/ZV8tX3RocmVlX2xh/c2Vyc19pbnRvX3Nw/YWNlLmpwZw.jpg',
    // 'https://afresearchlab.com/wp-content/uploads/2021/07/SOR-3.jpg',
    'https://img.atlasobscura.com/RSXx8ZWqYy2vN3yR8AnV_JZcHW3d4tVohmaUNG8wG5o/rt:fit/h:390/q:81/sm:1/scp:1/ar:1/aHR0cHM6Ly9hdGxh/cy1kZXYuczMuYW1h/em9uYXdzLmNvbS91/cGxvYWRzL3BsYWNl/X2ltYWdlcy9kM2U0/ZjNiOTQ4MWFlMmU5/YWRfMTQwMjEwLUYt/Wlo5OTktMDAxLkpQ/Rw.jpg',
    'https://img.atlasobscura.com/W8mmTWAgBbAxc2XO9NxZRArqUnjqbWhQeCBpUfD90co/rt:fit/h:390/q:81/sm:1/scp:1/ar:1/aHR0cHM6Ly9hdGxh/cy1kZXYuczMuYW1h/em9uYXdzLmNvbS91/cGxvYWRzL3BsYWNl/X2ltYWdlcy83YjE3/MzEwZTUyMjE0N2Y2/Y2JfU3RhcmZpcmUu/anBn.jpg',
    'https://img.atlasobscura.com/_3VYc4BqBnkjrrxblMN42pRhEk38J3xMeo2rIj-qQpI/rt:fit/h:390/q:81/sm:1/scp:1/ar:1/aHR0cHM6Ly9hdGxh/cy1kZXYuczMuYW1h/em9uYXdzLmNvbS91/cGxvYWRzL3BsYWNl/X2ltYWdlcy85MjEw/YTc3YzEyOTQwZTdm/NzVfMDkwMzA5LUYt/MDAwMVctOTA0LkpQ/Rw.jpg',
    // 'https://media.defense.gov/2024/Feb/22/2003398383/-1/-1/0/240222-F-EK582-1000.JPG'
  ]

  return (

    <div style={{
        width: '100vw',
        height: '100vh',
        backgroundImage: `url(${BackgroundSky})`,
        backgroundAttachment: 'fixed', 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
       
      }}>

    <Parallax pages={2} style={{ top: '0', left: '0' }}>


      <ParallaxLayer offset={1} speed={2}>
        <div style={{ 
            height: '200px',
            width: '200px',
            marginLeft: '75%',
            backgroundImage: `url(${Satellite})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center', 
            }}></div>
      </ParallaxLayer>

      <ParallaxLayer offset={1} speed={1}>
        <div style={{ 
            height: '800px',
            width: '800px',
            marginLeft: '100px',
            backgroundImage: `url(${Moon})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center', 
            }}></div>
      </ParallaxLayer>

      <ParallaxLayer offset={1} speed={0.5}>
            <div style={{ 
            height: '100%',
            width: '100%',
            backgroundImage: `url(${midground})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center', 
            }}></div>
      </ParallaxLayer>

      <ParallaxLayer offset={1} speed={0.4}>
        <div style={{
            height: '100%',
            width: '100%',
            backgroundImage: `url(${foreground})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',  
            backgroundRepeat: 'no-repeat',
            }}></div>
      </ParallaxLayer>

      <ParallaxLayer offset={1.61} speed={-0.95}>
      <div style={{
            height: '600px',
            width: '600px',
            backgroundImage: `url(${StarFire})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',  
            backgroundRepeat: 'no-repeat',
            }}></div>
      </ParallaxLayer>

      <ParallaxLayer offset={0.99} speed={1}>
        <div style={{ 
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#000', 
            height: '100%',
            color: '#fff',
            fontSize: '32px',
            justifyContent: 'center',
            alignItems: 'center', 
            }}>
            <h1 style={{
              textAlign: 'center',
              marginBottom: '60px',
            }}>WELCOME TO THE STARFIRE OPTICAL RANGE</h1>
            <div style={{
              fontSize: '24px',
              textAlign: 'center',
              maxWidth: '1655px',
            }}>
            <p>As part of AFRL’s Directed Energy, Space Electro-Optics Division, the Starfire Optical Range (SOR) is a vital resource in achieving the Department of the Air Force’s mission to operate freely in space.</p>
            <br/>
            <p>This world-class research facility is located on a hilltop 1,900 meters (6,240 feet) above sea level on Kirtland Air Force Base, New Mexico.</p>
            <br/>
            <p>SOR’s primary mission is to develop optical sensing, imaging, and atmospheric compensation technologies to support aerospace missions.</p>
            </div>

            <button style={{
              marginTop: '60px',
              padding: '10px 20px',
              fontSize: '24px',
              color: '#fff',
              backgroundColor: '#000',
              border: '2px solid #fff',
              cursor: 'pointer',
              transition: 'background-color 0.3s, color 0.3s',
            }} 
            onMouseOver={e => {
              e.currentTarget.style.color = '#000';
              e.currentTarget.style.backgroundColor = '#fff';
            }}
            onMouseOut={e => {
              e.currentTarget.style.color = '#fff';
              e.currentTarget.style.backgroundColor = '#000';
            }}
            onClick = {() => {navigate('home/SatelliteResults')}}
            >ENTER HERE</button>
            <div>
              <ImageViewer images={starfireImages}/>
            </div>
            
        </div>
      </ParallaxLayer>

      <ParallaxLayer offset={0.009} speed={1}>
      <div style={{ 
            height: '400px',
            width: '400px',
            marginLeft: '75%',
            backgroundImage: `url(${Satellite})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center', 
            }}></div>
      </ParallaxLayer>



    </Parallax>
    </div>
  );
};

export default BackgroundParallax;
