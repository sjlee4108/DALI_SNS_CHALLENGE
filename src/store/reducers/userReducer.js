// import userData from '../../resources/DALI_Data.json';
import { ActionTypes } from '../actions';

const initState = { all: null, user: null };

const UserReducer = (state = initState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_USER:
      return { all: state.all, user: action.payload };
    case ActionTypes.FETCH_USERS:
      return { all: action.payload, user: state.user };
    default:
      return state;
  }
};

export default UserReducer;
