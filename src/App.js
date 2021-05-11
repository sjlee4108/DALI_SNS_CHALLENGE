import React from 'react';
import {
  BrowserRouter as Router, Route, Switch,
} from 'react-router-dom';

import Nav from './components/Nav';
import LandingPage from './containers/landingPage/LandingPage';
import './style.scss';

const App = () => (
  <Router>
    <Nav />
    <div id="contentsContainer">
      <Switch>
        <Route exact path="/" component={LandingPage} />
        {/* <Route path="/about" component={About} />
        <Route exact path="/test/:id" component={Test} />
        <Route component={FallBack} /> */}
      </Switch>
    </div>
  </Router>
);

export default App;
