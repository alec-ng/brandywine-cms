import moment from 'moment';
import CMSPost from '../../types/cms-post';
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


export default function chosenPostReducer({chosenPost = null, data}, action) {
  const baseAction = Object.assign({}, action, {
    type: trimFulfilledAction(action.type)
  });
  let clone = chosenPost && CMSPost.fromSelf(chosenPost);
  
  switch (baseAction.type) {
    case UPDATE_CURRENT_POSTDATA: {
      clone.postData = action.editorData;
      return clone;
    }

    case UPDATE_CURRENT_POST:
      const newVal = typeof(action.value) === 'string' 
        ? action.value.trim() : action.value;

      let metadata = clone.post;
      metadata[action.property] = newVal;
      return clone;

    case SELECT_POST:
      return CMSPost.fromSelf(data[action.key])
    
    case CREATE_POST:
      return action.payload.cmsPost;

    case SAVE_CURRENT_POST:
    case PUBLISH_CURRENT_POST:
    case UNPUBLISH_CURRENT_POST:
      return dbSynchronize(chosenPost, baseAction);

    case CLOSE_CURRENT_POST:
    case DELETE_POST:
      return null;

    default: 
      return chosenPost;
  }
}

function dbSynchronize(chosenPost, action) {
  chosenPost.lastModified = moment();

  if (action.type === UNPUBLISH_CURRENT_POST) {
    chosenPost.post.isPublished = false;
  } 
  if (action.type === PUBLISH_CURRENT_POST) {
    chosenPost.post.isPublished = true;
  }
  
  return chosenPost;
}