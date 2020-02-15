import moment from 'moment';
import { generateKeyFromPost } from '../../util/post-generation';
import { trimFulfilledAction } from './index';
import {
  CREATE_POST,
  DELETE_POST,
  SAVE_CURRENT_POST,
  PUBLISH_CURRENT_POST,
  UNPUBLISH_CURRENT_POST,
} from '../actions/data-actions';
import {
  UPDATE_CURRENT_POSTDATA,
  UPDATE_CURRENT_POST,
  CLOSE_CURRENT_POST,
  SELECT_POST,
} from '../actions';

function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

export default function chosenPostReducer({chosenPost = null, data = {}}, action) {
  const baseActionName = trimFulfilledAction(action.type);
  let clonedPost = deepClone(chosenPost);

  switch (baseActionName) {
    case UPDATE_CURRENT_POSTDATA:
      clonedPost.cmsPost.postData = action.editorData;
      return clonedPost;

    case UPDATE_CURRENT_POST:
      let post = clonedPost.cmsPost.post;
      clonedPost.cmsPost.post[action.property] = action.value;
      clonedPost.cmsPost.post.key = generateKeyFromPost(post);
      return clonedPost;

    case SELECT_POST:
      const cmsPost = data[action.key];
      const newChosenPost = {
        key: action.key,
        cmsPost: deepClone(cmsPost)
      };
      return newChosenPost;

    case CREATE_POST:
      return {
        key: action.payload.newId,
        cmsPost: deepClone(action.payload.cmsPost)
      }  

    case SAVE_CURRENT_POST:
      clonedPost.cmsPost.lastModified = moment();
      return clonedPost;

    case PUBLISH_CURRENT_POST:
      clonedPost.cmsPost.post.isPublished = true;
      return clonedPost;

    case UNPUBLISH_CURRENT_POST:
      clonedPost.cmsPost.post.isPublished = false;
      return clonedPost;

    case CLOSE_CURRENT_POST:
    case DELETE_POST:
      return null;

    default: 
      return chosenPost;
  }
}