import React from 'react';
import { connect } from 'react-redux';
import UserDisplay from '../../components/userDisplay/UserDisplay';

import './MembersPageStyles.scss';

let temp = '';

const getMembers = (users) => users.sort(
  (a, b) => parseInt(a.year.substring(1), 10) - parseInt(b.year.substring(1), 10)
  || a.name.localeCompare(b.name),
).map((user, index) => {
  let addDivider = false;
  if (temp !== user.year) {
    addDivider = true;
    temp = user.year;
  }
  return (
    <>
      {addDivider ? <div className="dividerContainer">{`Class of ${temp}`}</div> : null}
      <UserDisplay
        name={user.name}
        quote={user.quote}
        src={user.picture}
        color={user.favoriteColor}
    // eslint-disable-next-line react/no-array-index-key
        key={index}
      />
    </>
  );
});

const MembersPage = (props) => (
  <div id="membersTopContainer">
    <div id="memberInnerContainer">
      <h1>Active Members</h1>
      {getMembers(props.users)}
    </div>
  </div>
);

const mapStateToProps = (state) => (
  {
    users: state.users,
  }
);

export default connect(mapStateToProps)(MembersPage);
