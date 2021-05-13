import React from 'react';
import CheckIcon from '@material-ui/icons/Check';

import NewAccount from '../../components/newAccount/NewAccount';
import './LandingPageStyles.scss';

const getWelcomeSection = () => (
  <div id="welcomeContainer">
    <h1>Dart Connect</h1>
    <h3>Want to reach out to Dartmouth community and make new friends? </h3>
    <div id="featuresContainer">
      <div className="feature"><CheckIcon /><span>Share posts to the community</span></div>
      <div className="feature"><CheckIcon /><span>Browse profiles to meet the community</span></div>
    </div>
  </div>
);

const LandingPage = () => (
  <div id="backgroundContainer">
    <div id="topContainer">
      {getWelcomeSection()}
      <NewAccount />
    </div>
  </div>
);

export default LandingPage;
