import React from 'react';
import {
  NavLink,
} from 'react-router-dom';
import PersonAdd from '@material-ui/icons/PersonAdd';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { IconButton } from '@material-ui/core';

import iconImg from '../../assets/icon.png';
import './NavStyles.scss';

const Nav = () => (
  <nav>
    <ul>
      <li id="iconSection"><NavLink to="/"><img id="iconImgStyle" src={iconImg} alt="" />Dart Connect</NavLink></li>
      <li><IconButton><NavLink to="/people"><PersonAdd /></NavLink></IconButton></li>
      <li><IconButton><NavLink to="/"><NotificationsIcon /></NavLink></IconButton></li>
      <li><IconButton><NavLink to="/"><ExitToAppIcon /></NavLink></IconButton></li>
    </ul>
  </nav>
);

export default Nav;
