import {
  getCMSPostsByGrouping,
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
export function savePost(firebase, id, cmsPost, grouping) {
  return dispatch => {
    return dispatch({
      type: SAVE_CURRENT_POST,
      payload: update(firebase, id, cmsPost, grouping)
    }).then(() => {
      dispatch(showSnackbar(
        getSnackbarMessage("update", cmsPost.post.title)
      ));
      dispatch(closeModal());
    });
  }
}

export const PUBLISH_CURRENT_POST = "PUBLISH_CURRENT_POST";
export function publishPost(firebase, id, cmsPost, grouping) {
  return dispatch => {
    return dispatch({
      type: PUBLISH_CURRENT_POST,
      payload: publish(firebase, id, cmsPost, grouping)
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

export const SET_GROUPING = 'SET_GROUPING';
export function setGrouping(firebase, grouping, data) {
  // If we have already retrieved the grouping data, no need for async logic
  if (data[grouping]) {
    return {type: SET_GROUPING, payload: { grouping: grouping }};
  }
  return {
    type: SET_GROUPING,
    payload: getCMSPostsByGrouping(grouping, firebase)
  }
}

