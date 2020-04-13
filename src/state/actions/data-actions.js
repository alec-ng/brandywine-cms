import {
  getPostDictionary,
  remove,
  publish,
  unpublish,
  update,
  insert
} from '../../util/firebase-post-util';

import { showSnackbar, closeModal } from '../actions';
import { getSnackbarMessage } from '../../components/stateful/snackbar-manager';

/**
 * Concerns async actions that interact with firebase backend
 * Written with redux-thunk and redux-promise-middleware
 */

export const CREATE_POST = "CREATE_POST";
export function createPost(firebase, cmsPost) {
  return dispatch => {
    return dispatch({
      type: CREATE_POST,
      payload: insert(firebase, cmsPost)
    }).then(() => {
      dispatch(showSnackbar(
        getSnackbarMessage("create", cmsPost.post.title)
      ));
      dispatch(closeModal());
    });
  }
}

export const DELETE_POST = "DELETE_POST";
export function deletePost(firebase, id, title) {
  return dispatch => {
    return dispatch({
      type: DELETE_POST,
      payload: remove(id, firebase)
    }).then(() => {
      dispatch(showSnackbar(
        getSnackbarMessage("delete", title)
      ));
      dispatch(closeModal());
    });
  }
}

export const SAVE_CURRENT_POST = "SAVE_CURRENT_POST";
export function savePost(firebase, id, cmsPost, grouping, indexEntry) {
  return dispatch => {
    return dispatch({
      type: SAVE_CURRENT_POST,
      payload: update(firebase, id, cmsPost, grouping, indexEntry)
    }).then(() => {
      dispatch(showSnackbar(
        getSnackbarMessage("update", cmsPost.post.title)
      ));
      dispatch(closeModal());
    });
  }
}

export const PUBLISH_CURRENT_POST = "PUBLISH_CURRENT_POST";
export function publishPost(firebase, id, cmsPost, grouping, indexEntry) {
  return dispatch => {
    return dispatch({
      type: PUBLISH_CURRENT_POST,
      payload: publish(firebase, id, cmsPost, grouping, indexEntry)
    }).then(() => {
      dispatch(showSnackbar(
        getSnackbarMessage("publish", cmsPost.post.title)
      ));
      dispatch(closeModal());
    });
  }
}

export const UNPUBLISH_CURRENT_POST = "UNPUBLISH_CURRENT_POST";
export function unpublishPost(firebase, id, cmsPost, grouping) {
  return dispatch => {
    return dispatch({
      type: UNPUBLISH_CURRENT_POST,
      payload: unpublish(firebase, id, cmsPost, grouping)
    }).then(() => {
      dispatch(showSnackbar(
        getSnackbarMessage("unpublish", cmsPost.post.title)
      ));
      dispatch(closeModal());
    });
  }
}

export const GET_ALL_POSTS = 'GET_ALL_POSTS';
export function getPosts(firebase) {
  return dispatch => {
    dispatch({
      type: GET_ALL_POSTS,
      payload: getPostDictionary(firebase)
    });
  }
}

