import { ActionTypes } from '../actions';
import postData from '../../resources/postData.json';

const initState = { all: postData };

const PostsReducer = (state = initState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_POST:
      return { all: [action.payload, ...state.all] };
    case ActionTypes.FETCH_POSTS:
      return state;
    default:
      return state;
  }
};

export default PostsReducer;
