// keys for actiontypes
export const ActionTypes = {
  FETCH_POSTS: 'FETCHPOSTS',
  ADD_POST: 'ADDPOST',
};

export function addPost(post) {
  return { type: ActionTypes.ADD_POST, payload: post };
}
