import React from 'react';
import Avatar from 'react-avatar';

import './ImageStyles.scss';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader

const getImages = (imgurls) => imgurls.map((url) => (<div id="ImageContainer"><img src={url} alt="" /></div>));
const Image = (props) => {
  console.log(props);
  if (props.usage === 'profile') {
    return (
      <Avatar size={props.size ? props.size : '40'} src={props.src} name={props.alt} round />
    );
  }
  return props.src.length === 1 ? (<img className="postImage" src={props.src[0]} alt="" />)
    : (
      <div className="sliderContainer">
        <Carousel
          showArrows
          showThumbs={false}
        >
          {getImages(props.src)}

        </Carousel>
      </div>
    );
};

export default Image;
