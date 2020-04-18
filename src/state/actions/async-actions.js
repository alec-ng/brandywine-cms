import FirestoreAPI from '../../modules/firestore-api';
import { showSnackbar, closeModal } from '.';
import { getSnackbarMessage } from '../../components/stateful/snackbar-manager';

/**
 * Async actions that use firestore APIs
 * Written with redux-thunk and redux-promise-middleware
 */

export const CREATE_POST = "CREATE_POST";
export function createPost(firebase, cmsPost) {
  return dispatch => {
    return dispatch({
      type: CREATE_POST,
      payload: FirestoreAPI.insert(firebase, cmsPost)
    }).then(() => {
      dispatch(showSnackbar(
        getSnackbarMessage("create", cmsPost.post.title)
      ));
      dispatch(closeModal());
    });
  }
}

export const DELETE_POST = "DELETE_POST";
export function deletePost(firebase, cmsPost) {
  return dispatch => {
    return dispatch({
      type: DELETE_POST,
      payload: FirestoreAPI.remove(cmsPost.post.postDataId, firebase)
    }).then(() => {
      dispatch(showSnackbar(
        getSnackbarMessage("delete", cmsPost.post.title)
      ));
      dispatch(closeModal());
    });
  }
}

export const SAVE_CURRENT_POST = "SAVE_CURRENT_POST";
export function savePost(firebase, cmsPost) {
  return dispatch => {
    return dispatch({
      type: SAVE_CURRENT_POST,
      payload: FirestoreAPI.update(firebase, cmsPost)
    }).then(() => {
      dispatch(showSnackbar(
        getSnackbarMessage("update", cmsPost.post.title)
      ));
      dispatch(closeModal());
    });
  }
}

export const PUBLISH_CURRENT_POST = "PUBLISH_CURRENT_POST";
export function publishPost(firebase, cmsPost) {
  return dispatch => {
    return dispatch({
      type: PUBLISH_CURRENT_POST,
      payload: FirestoreAPI.togglePublish(firebase, cmsPost, true)
    }).then(() => {
      dispatch(showSnackbar(
        getSnackbarMessage("publish", cmsPost.post.title)
      ));
      dispatch(closeModal());
    });
  }
}

export const UNPUBLISH_CURRENT_POST = "UNPUBLISH_CURRENT_POST";
export function unpublishPost(firebase, cmsPost) {
  return dispatch => {
    return dispatch({
      type: UNPUBLISH_CURRENT_POST,
      payload: FirestoreAPI.togglePublish(firebase, cmsPost, false)
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
      payload: FirestoreAPI.getPostDictionary(firebase)
    });
  }
}