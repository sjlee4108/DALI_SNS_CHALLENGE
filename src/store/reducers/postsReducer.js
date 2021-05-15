import { ActionTypes } from '../actions';

const initState = { all: [] };

const PostsReducer = (state = initState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_POSTS:
      return { all: action.payload };
    default:
      return state;
  }
};

export default PostsReducer;
