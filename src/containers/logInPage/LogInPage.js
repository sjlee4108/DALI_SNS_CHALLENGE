import React from 'react';
import LogIn from '../../components/logIn/LogIn';

import './LogInPageStyles.scss';

const LogInPage = (props) => (
  <div id="logInPageContainer">
    <LogIn history={props.history} />
  </div>
);

export default LogInPage;
