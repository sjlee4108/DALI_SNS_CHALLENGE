import React from 'react';
import { connect } from 'react-redux';
import NewPost from '../../components/newPost/NewPost';
import Post from '../../components/post/Post';
import UserDisplay from '../../components/userDisplay/UserDisplay';
import { addPost } from '../../store/actions';

import './HomePageStyles.scss';

const getPosts = (posts) => posts.map((post, index) => (
  <Post name={post.user}
    year={post.year}
    userImg={post.userImg}
    body={post.body}
    tag={post.tag}
    imgUrl={post.imgUrl}
    // eslint-disable-next-line react/no-array-index-key
    key={index}
  />
));

const getPostSection = (posts, handleNewPost) => (
  <div id="postSectionContainer">
    <NewPost handleNewPost={handleNewPost} />
    {getPosts(posts)}
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

const getRandomMembers = (users) => getRandom(users, 4).map((user, index) => (
  <UserDisplay
    name={user.name}
    quote={user.quote}
    src={user.picture}
    color={user.favoriteColor}
    // eslint-disable-next-line react/no-array-index-key
    key={index}
  />
));
const getFriendsSection = (users) => (
  <div id="friendsContainer">
    <UserDisplay quote="yolo" src="" name="Lizzy Pale" />

    <div id="friendDivider">
      <span>Check New Friends</span>
      <span>See All</span>
    </div>
    {getRandomMembers(users)}
  </div>
);
const HomePage = (props) => (
  <div id="topLevelContainer">
    {getPostSection(props.posts, props.addPost)}
    {getFriendsSection(props.users)}
  </div>
);

const mapStateToProps = (state) => (
  {
    posts: state.posts.all,
    users: state.users,
  }
);

export default connect(mapStateToProps, { addPost })(HomePage);
