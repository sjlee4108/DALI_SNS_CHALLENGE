import React from 'react';
import {
  BrowserRouter as Router, Redirect, Route, Switch,
} from 'react-router-dom';
import GuardedRoute from './components/guardedRoute/GuardedRoute';

import Nav from './components/nav/Nav';
import HomePage from './containers/homePage/HomePage';
import MembersPage from './containers/membersPage/MembersPage';
import ProfilePage from './containers/profilePage/ProfilePage';
import LogInPage from './containers/logInPage/LogInPage';
import LandingPage from './containers/landingPage/LandingPage';
import { AuthProvider, useAuth } from './firebase/AuthContext';

import './style.scss';

const FallBack = () => (
  <div>
    Error 404: Invalid Route
  </div>
);

// reverse guarded route
const PublicRoute = (props) => {
  const { currentUser } = useAuth();
  if (currentUser == null) {
    return <Route path={props.path} component={props.component} />;
  }
  return <Redirect to="/" />;
};

const App = () => (
  <Router>
    <AuthProvider>
      <Nav />
      <div id="contentsContainer">
        <Switch>
          <GuardedRoute exact path="/" component={HomePage} />
          <GuardedRoute path="/people/:userName" component={ProfilePage} />
          <GuardedRoute path="/people" component={MembersPage} />
          <PublicRoute path="/signup" component={LandingPage} />
          <PublicRoute path="/login" component={LogInPage} />
          <Route component={FallBack} />
        </Switch>
      </div>
    </AuthProvider>
  </Router>
);

export default App;
