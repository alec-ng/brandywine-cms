import moment from 'moment';
import { trimFulfilledAction } from './index';
import {
  CREATE_POST,
  DELETE_POST,
  SAVE_CURRENT_POST,
  PUBLISH_CURRENT_POST,
  UNPUBLISH_CURRENT_POST,
  GET_ALL_POSTS,
} from '../actions/data-actions';


function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

export default function dataReducer({data = {}, chosenPost = null}, action) {
  const baseActionName = trimFulfilledAction(action.type);
  let mergePost = {};
  let clonedChosenPost = deepClone(chosenPost);

  switch (baseActionName) {
    case CREATE_POST:
      let newPost = {};
      newPost[action.payload.newId] = deepClone(action.payload.cmsPost);
      return Object.assign({}, data, newPost);

    case DELETE_POST:
      let clonedData = deepClone(data);
      delete clonedData[action.payload.id];
      return clonedData;
  
    case SAVE_CURRENT_POST:
      clonedChosenPost.cmsPost.lastModified = moment();
      mergePost[chosenPost.key] = clonedChosenPost.cmsPost;
      return Object.assign({}, data, mergePost);
    
    case UNPUBLISH_CURRENT_POST:
      clonedChosenPost.cmsPost.post.isPublished = false;
      mergePost[chosenPost.key] = clonedChosenPost.cmsPost;
      return Object.assign({}, data, mergePost);
    
    case PUBLISH_CURRENT_POST:
      clonedChosenPost.cmsPost.post.isPublished = true;
      mergePost[chosenPost.key] = clonedChosenPost.cmsPost;
      return Object.assign({}, data, mergePost);

    case GET_ALL_POSTS:
      return action.payload;  
    
    default:
      return data;
  }
}