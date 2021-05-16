import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import stc from 'string-to-color';

import WcIcon from '@material-ui/icons/Wc';
import CakeIcon from '@material-ui/icons/Cake';
import HomeIcon from '@material-ui/icons/Home';
import AndroidIcon from '@material-ui/icons/Android';
import AppleIcon from '@material-ui/icons/Apple';

import { fetchUsers } from '../../store/actions';

import './ProfilePageStyles.scss';

const ROOT_URL = 'https://open.mapquestapi.com/staticmap/v5/map?key=';
const API_KEY = 'Q52TcQcTEGZZvkqfSsM5FLgnmcnmBBSb';

// `${ROOT_URL}${API_KEY}&center=${loc}&zoom=10`

const getTopSection = (quote, name, image, color) => (
  <div id="profileTopSection">
    <div id="quoteSection"><p style={{ color: stc(color) }}>{quote}</p></div>
    <div id="nameImage">
      <img src={image} alt="" id="bigProfile" />
      <h1>{name}</h1>
    </div>
  </div>
);

const getAboutMeSection = (gender, bday, home) => (
  <div className="profileBox">
    <h2>General</h2>
    <div className="profileGrid">
      <div className="profileRow"><WcIcon /><h3>Gender</h3></div>
      <h4>{gender}</h4>
      <div className="profileRow"><CakeIcon /><h3>Birthday</h3></div>
      <h4>{bday}</h4>
      <div className="profileRow"><HomeIcon /><h3>Home</h3></div>
      <h4>{home}</h4>
    </div>
    <img id="mapImage"
      src={`${ROOT_URL}${API_KEY}
      &size=400,200&locations=${home.replace(/[&]/g, '||')}`}
      alt=""
    />
  </div>
);

const getEducationSection = (year, major, role) => (
  <div className="profileBox">
    <h2>Education</h2>
    <div className="profileGrid">
      <h3>Class Year</h3>
      <h4>{year}</h4>
      <h3>Major</h3>
      <h4>{major}</h4>
      <h3>Role</h3>
      <h4>{role}</h4>
    </div>
  </div>
);

const getFunSection = (artist, color, shoe, phone) => (
  <div className="profileBox">
    <h2>Fun Facts</h2>
    <div className="profileGrid">
      <h3>Fav Artist</h3>
      <h4>{artist}</h4>
      <h3>Fav Color</h3>
      <h4>{color}</h4>
      <h3>Fav Shoes</h3>
      <h4>{shoe}</h4>
      <h3>Phone Type</h3>
      <h4>{
      // eslint-disable-next-line no-nested-ternary
      phone === 'iOS' ? (<AppleIcon />) : phone === 'Android' ? <AndroidIcon /> : phone
      }
      </h4>
    </div>
  </div>
);

const ProfilePage = (props) => {
  // find user among users
  useEffect(() => {
    props.fetchUsers();
  }, []);

  if (props.users != null) {
    let user = props.users.filter((u) => u.name === props.location.pathname.split('/').slice(-1)[0]);
    if (user.length !== 1) {
      return null;
    }

    [user] = user;
    return (
      <div id="profileTopContainer">
        {getTopSection(user.quote, user.name, user.picture, user.favoriteColor)}
        {getAboutMeSection(user.gender, user.birthday, user.home)}
        {getEducationSection(user.year, user.major, user.role)}
        {getFunSection(user.favoriteArtist, user.favoriteColor, user.favoriteShoe, user.phoneType)}
      </div>
    );
  }
  return null;
};

const mapStateToProps = (state) => (
  {
    users: state.users.all,
  }
);

export default connect(mapStateToProps, { fetchUsers })(ProfilePage);
