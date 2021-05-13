import React from 'react';
import {
  BrowserRouter as Router, Route, Switch,
} from 'react-router-dom';

import Nav from './components/nav/Nav';
import HomePage from './containers/homePage/HomePage';
import LandingPage from './containers/landingPage/LandingPage';
import MembersPage from './containers/membersPage/MembersPage';
import './style.scss';

const FallBack = () => {
  <div>
    Error 404: Invalid Route
  </div>;
};

const App = () => (
  <Router>
    <Nav />
    <div id="contentsContainer">
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route path="/home" component={HomePage} />
        <Route exact path="/people" component={MembersPage} />
        <Route component={FallBack} />
      </Switch>
    </div>
  </Router>
);

export default App;
