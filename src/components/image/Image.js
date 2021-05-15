import React from 'react';
import { Avatar, makeStyles } from '@material-ui/core';

import './ImageStyles.scss';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import stc from 'string-to-color';

const getImages = (imgurls) => imgurls.map((url) => (<div key={url} id="ImageContainer"><img src={url} alt="" /></div>));
const Image = (props) => {
  const useStyles = makeStyles(() => ({
    color: {
      backgroundColor: props.color ? stc(props.color) : '#00693e',
    },
  }));

  if (props.usage === 'profile') {
    const classes = useStyles();
    return (
      <Avatar className={classes.color} src={props.src}>{props.alt.charAt(0)}</Avatar>
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
