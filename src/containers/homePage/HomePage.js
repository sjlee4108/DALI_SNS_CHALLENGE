import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Map } from 'immutable';

import NewPost from '../../components/newPost/NewPost';
import Post from '../../components/post/Post';
import UserDisplay from '../../components/userDisplay/UserDisplay';
import {
  addPost, fetchPosts, fetchUserData, fetchUsers,
} from '../../store/actions';

import './HomePageStyles.scss';
import { useAuth } from '../../firebase/AuthContext';

const getPosts = (posts) => Map(posts).entrySeq().map(([key, value]) => (
  <Post name={value.user}
    year={value.year}
    color={value.color}
    body={value.body}
    tag={value.tag}
    imgUrl={value.imgUrl ? value.imgUrl : []}
    key={key}
  />
));

const getPostSection = (posts, handleNewPost, user) => (
  <div id="postSectionContainer">
    {getPosts(posts)}
    <NewPost handleNewPost={handleNewPost} user={user} />
  </div>
);

// helper function from online
// generate random subset of size n for given arr.
const getRandom = (arr, n) => {
  const result = new Array(n);
  let len = arr.length;
  let N = n;
  const taken = new Array(len);
  if (n > len) { throw new RangeError('getRandom: more elements taken than available'); }
  // eslint-disable-next-line no-plusplus
  while (N--) {
    const x = Math.floor(Math.random() * len);
    result[N] = arr[x in taken ? taken[x] : x];
    // eslint-disable-next-line no-plusplus
    taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
};

const getRandomMembers = (users) => getRandom(users, 4).map((user) => (
  <UserDisplay
    name={user.name}
    quote={user.quote}
    src={user.picture}
    color={user.favoriteColor}
    hasProfile
    key={user.name}
  />
));

const getFriendsSection = (users, user) => (
  <div id="friendsContainer">
    {user ? (<UserDisplay quote={user.quote} src="" name={user.name} color={user.color} />) : null}

    <div id="friendDivider">
      <span>Check New Friends</span>
      <span>See All</span>
    </div>
    {users ? getRandomMembers(users) : null}
  </div>
);

const HomePage = (props) => {
  const { currentUser } = useAuth();
  useEffect(() => {
    props.fetchPosts();
    props.fetchUserData(currentUser.uid);
    props.fetchUsers();
  }, []);
  return (
    <div id="topLevelContainer">
      {getPostSection(props.posts, props.addPost, props.user)}
      {getFriendsSection(props.users, props.user)}
    </div>
  );
};

const mapStateToProps = (state) => (
  {
    posts: state.posts.all,
    users: state.users.all,
    user: state.users.user,
  }
);

export default connect(mapStateToProps, {
  addPost, fetchPosts, fetchUserData, fetchUsers,
})(HomePage);
