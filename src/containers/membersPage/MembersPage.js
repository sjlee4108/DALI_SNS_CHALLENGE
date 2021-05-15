import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import UserDisplay from '../../components/userDisplay/UserDisplay';

import { fetchUsers } from '../../store/actions';

import './MembersPageStyles.scss';

let temp = '';

const getMembers = (users) => users.sort(
  (a, b) => parseInt(a.year.substring(1), 10) - parseInt(b.year.substring(1), 10)
  || a.name.localeCompare(b.name),
).map((user) => {
  let addDivider = false;
  if (temp !== user.year) {
    addDivider = true;
    temp = user.year;
  }
  return (
    <React.Fragment key={user.name}>
      {addDivider ? <div key={temp} className="dividerContainer">{`Class of ${temp}`}</div> : null}
      <UserDisplay
        name={user.name}
        quote={user.quote}
        src={user.picture}
        color={user.favoriteColor}
        key={user.name}
      />
    </React.Fragment>
  );
});

const MembersPage = (props) => {
  useEffect(() => {
    props.fetchUsers();
  }, []);
  return (
    <div id="membersTopContainer">
      <div id="memberInnerContainer">
        <h1>Active Members</h1>
        {props.users ? getMembers(props.users) : null}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => (
  {
    users: state.users.all,
  }
);

export default connect(mapStateToProps, { fetchUsers })(MembersPage);
