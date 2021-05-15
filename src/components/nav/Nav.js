import React from 'react';
import {
  NavLink,
} from 'react-router-dom';
import PersonAdd from '@material-ui/icons/PersonAdd';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { IconButton } from '@material-ui/core';

import iconImg from '../../assets/icon.png';
import './NavStyles.scss';
import { useAuth } from '../../firebase/AuthContext';

const Nav = () => {
  const { logout, currentUser } = useAuth();

  return (
    <nav>
      <ul>
        <li id="iconSection"><NavLink to="/"><img id="iconImgStyle" src={iconImg} alt="" />Dart Connect</NavLink></li>
        {currentUser ? (
          <>
            <li><IconButton><NavLink to="/people"><PersonAdd /></NavLink></IconButton></li>
            <li><IconButton onClick={logout}><ExitToAppIcon /></IconButton></li>
          </>
        )
          : <li><NavLink to="/login">Sign In</NavLink></li>}
      </ul>
    </nav>
  );
};

export default Nav;
