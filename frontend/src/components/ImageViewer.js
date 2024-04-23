import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';


// images = ["filepath/image.png", "myimage.jpg"]


class ImageViewer extends Component{
  constructor(props){
    super(props)
    this.images = props.images
  }

  render () {
      return (
          <Carousel showArrows={true} >
          {this.images.map( item => {
          return (<div>
            <img src={item} alt='satellite'/>
          </div>
          )})}

          </Carousel>
        )
      }
    }

export default ImageViewer;
