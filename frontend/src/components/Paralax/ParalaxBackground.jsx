import React from 'react'
import './ParalaxBackground.css'
import background from './background.png'
import foreground from './foreground.png'
import midground from './midground.png'
import moon from './moon.png'

export default function ParalaxBackground() {

  document.addEventListener('scroll', function() {
    const scrollPosition = window.pageYOffset;
    const skySpeed = 0.1;
    const mountainSpeed = 0.2;
    const foregroundSpeed = 0.3;
    const moonSpeed = 0.05;

    document.querySelector('.background-sky').style.transform = `translateY(${scrollPosition * skySpeed}px)`;
    // document.querySelector('.moon').style.transform = `translateY(${scrollPosition * moonSpeed}px)`;
    // document.querySelector('.midground').style.transform = `translateY(${scrollPosition * mountainSpeed}px)`;
    document.querySelector('.foreground').style.transform = `translateY(${scrollPosition * foregroundSpeed}px)`;
  })

  return (
    <>
      <div className='background-sky'></div>
      <div className='paralax-div'>
        {/* <img className='moon' src= {moon} alt='moon' /> */}
        {/* <img className='midground' src= {midground} alt='mountains' /> */}
        <div className='foreground'></div>
        {/* <img className='foreground' src= {foreground} alt='ground' /> */}
      </div>
    </>
  )
}