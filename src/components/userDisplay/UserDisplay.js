import React from 'react';
import Image from '../image/Image';
import Quote from '../quote/Quote';
import './UserDisplayStyles.scss';

const UserDisplay = (props) => (
  <div id="UserDisplayContainer">
    <div id="nameImageSection">
      <Image usage="profile" size="40" src={props.src ? props.src : ''} alt={props.name} />
      <div id="userDisplayname">{props.name}</div>
    </div>
    <Quote value={props.quote} color={props.color} />
  </div>
);

export default UserDisplay;
