import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import styled from 'styled-components'


const StyledCarousel = styled(Carousel)`
margin: 10px;
height: 10%;
width: 80%;

.carousel .slide {
  display: flex;
  justify-content: center;
  align-items: center;
}

img {
  max-width: 100%;
  max-height: 100%;
}

`


// images = ["filepath/image.png", "myimage.jpg"]


class ImageViewer extends Component{
  constructor(props){
    super(props)
    this.images = props.images
  }

  render () {
      return (
        <>

            <StyledCarousel showArrows={true} >
            {this.images.map( (item, index) => {
            return (<div key={index}>
              <img src={item} alt='satellite'/>

            </div>
            )})}

            </StyledCarousel>

        </>
        )
      }
    }

export default ImageViewer;
