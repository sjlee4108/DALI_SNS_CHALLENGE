// keys for actiontypes
export const ActionTypes = {
  FETCH_POSTS: 'FETCHPOSTS',
  ADD_POST: 'ADDPOST',
  ERROR_SET: 'ERROR',
};

export function addPost(post) {
  return { type: ActionTypes.ADD_POST, payload: post };
}
