import axios from 'axios';
import { database } from '../../firebase/firebase';
// keys for actiontypes
export const ActionTypes = {
  FETCH_POSTS: 'FETCHPOSTS',
  ADD_POST: 'ADDPOST',
  ERROR_SET: 'ERROR',
  FETCH_USER: 'FETCHUSER',
  FETCH_USERS: 'FETCHUSERS',
};

export function fetchUserData(userID) {
  return (dispatch) => {
    database.ref('users').child(userID).on('value', (snapshot) => {
      const userInfo = snapshot.val();
      dispatch({ type: ActionTypes.FETCH_USER, payload: userInfo });
    });
  };
}

export function addPost(newPost) {
  // adds a new note
  return () => database.ref('posts').push().set(newPost);
}

export function addUser(userID, userInfo) {
  // add new board with given title
  return (dispatch) => {
    database.ref('users').child(userID).set(userInfo);
    dispatch({ type: ActionTypes.FETCH_USER, payload: userInfo });
  };
}

export function fetchPosts() {
  return (dispatch) => {
    database.ref('posts').limitToLast(20).on('value', (snapshot) => {
      const posts = snapshot.val();
      dispatch({ type: ActionTypes.FETCH_POSTS, payload: posts });
    });
  };
}

export function fetchUsers() {
  return (dispatch) => {
    axios.get('https://raw.githubusercontent.com/dali-lab/dali-challenges/master/data/DALI_Data.json')
      .then((response) => {
        dispatch({ type: ActionTypes.FETCH_USERS, payload: response.data });
      }).catch((error) => {
        dispatch({ type: ActionTypes.ERROR_SET, error });
      });
  };
}
