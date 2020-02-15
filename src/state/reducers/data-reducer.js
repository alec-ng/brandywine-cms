import moment from 'moment';
import { trimFulfilledAction } from './index';
import {
  CREATE_POST,
  DELETE_POST,
  SAVE_CURRENT_POST,
  PUBLISH_CURRENT_POST,
  UNPUBLISH_CURRENT_POST,
  SET_GROUPING,
} from '../actions/data-actions';


function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

export default function dataReducer({data = {}, chosenPost = null, postGroup = null}, action) {
  const baseActionName = trimFulfilledAction(action.type);
  const dataPostGroupSlice = data[postGroup];
  let mergePost = {};
  let clonedChosenPost = deepClone(chosenPost);

  function mergeDataSlice(postGroupSlice) {
    let slice = {};
    slice[postGroup] = postGroupSlice;
    return Object.assign({}, data, slice);
  }

  switch (baseActionName) {
    case CREATE_POST:
      let newPost = {};
      newPost[action.payload.newId] = deepClone(action.payload.cmsPost);
      return mergeDataSlice(Object.assign({}, dataPostGroupSlice, newPost));

    case DELETE_POST:
      let clonedData = deepClone(dataPostGroupSlice);
      delete clonedData[action.payload.id];
      return mergeDataSlice(clonedData);
    
    case SAVE_CURRENT_POST:
      clonedChosenPost.cmsPost.lastModified = moment();
      mergePost[chosenPost.key] = clonedChosenPost.cmsPost;
      return mergeDataSlice(Object.assign({}, dataPostGroupSlice, mergePost));
    
    case UNPUBLISH_CURRENT_POST:
      clonedChosenPost.cmsPost.post.isPublished = false;
      mergePost[chosenPost.key] = clonedChosenPost.cmsPost;
      return mergeDataSlice(Object.assign({}, dataPostGroupSlice, mergePost));
    
    case PUBLISH_CURRENT_POST:
      clonedChosenPost.cmsPost.post.isPublished = true;
      mergePost[chosenPost.key] = clonedChosenPost.cmsPost;
      return mergeDataSlice(Object.assign({}, dataPostGroupSlice, mergePost));

    case SET_GROUPING:
      if (data[action.payload.grouping]) {
        return data;
      }
      let newData = {};
      newData[action.payload.grouping] = action.payload.data;
      return Object.assign({}, data, newData);

    default:
      return data;
  }
}