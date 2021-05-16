import React from 'react';
import { NavLink } from 'react-router-dom';
import Image from '../image/Image';
import Quote from '../quote/Quote';
import './UserDisplayStyles.scss';

const UserDisplay = (props) => {
  if (props.hasProfile) {
    return (
      <NavLink className="removeDefaultStyle UserDisplayContainer" to={`/people/${props.name}`}>
        <div id="nameImageSection">
          <Image usage="profile" size="40" src={props.src ? props.src : ''} alt={props.name} color={props.color} />
          <div id="userDisplayname">{props.name}</div>
        </div>
        <Quote value={props.quote} color={props.color} />
      </NavLink>
    );
  }
  return (
    <div className=" UserDisplayContainer">
      <div id="nameImageSection">
        <Image usage="profile" size="40" src={props.src ? props.src : ''} alt={props.name} color={props.color} />
        <div id="userDisplayname">{props.name}</div>
      </div>
      <Quote value={props.quote} color={props.color} />
    </div>
  );
};

export default UserDisplay;
