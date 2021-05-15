import React from 'react';
import { connect } from 'react-redux';

import './ProfilePageStyles.scss';

// const ROOT_URL = 'https://open.mapquestapi.com/staticmap/v5/map?key=';
// const API_KEY = 'Q52TcQcTEGZZvkqfSsM5FLgnmcnmBBSb';

// `${ROOT_URL}${API_KEY}&center=${loc}&zoom=10`

const ProfilePage = (props) => {
  // find user among users
  let user = props.users.filter((u) => u.name === props.match.params.userName);
  if (user.length !== 1) {
    return null;
  }

  [user] = user;
  return (
    <div id="profileTopContainer">
      <img src="" alt="" />
    </div>
  );
};

const mapStateToProps = (state) => (
  {
    users: state.users.all,
  }
);

export default connect(mapStateToProps, null)(ProfilePage);
