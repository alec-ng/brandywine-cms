import moment from 'moment';
import { trimFulfilledAction } from './index';
import CMSPost from '../../types/cms-post';
import {
  CREATE_POST,
  DELETE_POST,
  SAVE_CURRENT_POST,
  PUBLISH_CURRENT_POST,
  UNPUBLISH_CURRENT_POST,
  GET_ALL_POSTS,
} from '../actions/data-actions';

export default function dataReducer({data = {}, chosenPost}, action) {
  const baseAction = Object.assign({}, action, {
    type: trimFulfilledAction(action.type)
  });

  switch (baseAction.type) {
    case SAVE_CURRENT_POST:
    case UNPUBLISH_CURRENT_POST:
    case PUBLISH_CURRENT_POST:
      return updatePost(data, chosenPost, baseAction);

    case CREATE_POST: {
      let clone = CMSPost.fromSelf(action.payload.cmsPost);
      clone.post.postDataId = action.payload.newId;
      return Object.assign({}, data, {
        [action.payload.newId]: clone
      });
    }

    case DELETE_POST:
      let clone = Object.assign({}, data);
      delete clone[action.payload.id];
      return clone;

    // convert obj data to CMSPost instances
    case GET_ALL_POSTS:
      return Object.keys(action.payload).reduce((data, postId) => {
        // HOTFIX: retroactively populate postDataId field on metadata
        let cmsPost = CMSPost.fromObject(action.payload[postId])
        cmsPost.post.postDataId = postId;
        return Object.assign({}, data, {
          [postId]: cmsPost
        });
      }, {});
    
    default:
      return data;
  }
}

function updatePost(data, chosenPost, action) {
  let clone = CMSPost.fromSelf(chosenPost);
  clone.lastModified = moment();
  
  if (action.type === UNPUBLISH_CURRENT_POST) {
    clone.post.isPublished = false;
  } 
  if (action.type === PUBLISH_CURRENT_POST) {
    clone.post.isPublished = true;
  } 

  return Object.assign({}, data, {
    [chosenPost.post.postDataId]: clone
  });
}