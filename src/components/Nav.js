import React from 'react';
import {
  BrowserRouter as NavLink,
} from 'react-router-dom';

const Nav = () => (
  <nav>
    <ul>
      <li><NavLink to="/">Home</NavLink></li>
      <li><NavLink to="/members">About</NavLink></li>
      <li><NavLink to="/test/id2">test id2</NavLink></li>
    </ul>
  </nav>
);

export default Nav;
