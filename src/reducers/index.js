import { generateKeyFromPost } from "./../post-util";
import moment from "moment";

export const ACTION_TYPES = {
  // new post is created and chosen post is set to it
  CREATE_POST: "CREATE_POST",
  // post and its contents are deleted
  DELETE_POST: "DELETE_POST",
  // on editor change
  UPDATE_CURRENT_POSTDATA: "UPDATE_CURRENT_POSTDATA",
  // on page metadata change
  UPDATE_CURRENT_POST: "UPDATE_CURRENT_POST",
  // on saving the current post button click
  SAVE_CURRENT_POST: "SAVE_CURRENT_POST",
  // saving the current post and exiting the current view
  CLOSE_CURRENT_POST: "CLOSE_CURRENT_POST",
  // toggle publish flags
  SAVE_AND_CLOSE_CURRENT_POST: "SAVE_AND_CLOSE_CURRENT_POST",
  // toggle publish flags
  PUBLISH_CURRENT_POST: "PUBLISH_CURRENT_POST",
  UNPUBLISH_CURRENT_POST: "UNPUBLISH_CURRENT_POST",
  // post is chosen
  SELECT_POST: "SELECT_POST"
};

// Note: chosenPost should have a difference reference than data[chosenPost.key]
// Utilize JSON.parse + JSON.stringify for this

export const MainReducer = function(state, action) {
  switch (action.type) {
    case ACTION_TYPES.CREATE_POST:
    case ACTION_TYPES.DELETE_POST:
    case ACTION_TYPES.SAVE_CURRENT_POST:
    case ACTION_TYPES.PUBLISH_CURRENT_POST:
    case ACTION_TYPES.UNPUBLISH_CURRENT_POST:
      return Object.assign({}, state, dataReducer(state, action));

    case ACTION_TYPES.UPDATE_CURRENT_POSTDATA:
    case ACTION_TYPES.UPDATE_CURRENT_POST:
    case ACTION_TYPES.SELECT_POST:
    case ACTION_TYPES.CLOSE_CURRENT_POST:
      return Object.assign({}, state, chosenPostReducer(state, action));
    default:
      throw new Error(`Unrecognized action type: ${action.type}`);
  }
};

// Actions whose primary need is to change chosenPoset
function chosenPostReducer(state, action) {
  let localChosenPost = Object.assign({}, state.chosenPost);

  switch (action.type) {
    case ACTION_TYPES.UPDATE_CURRENT_POSTDATA:
      localChosenPost.cmsPost.postData = action.payload;
      break;
    case ACTION_TYPES.UPDATE_CURRENT_POST:
      localChosenPost.cmsPost.post[action.payload.property] =
        action.payload.value;
      localChosenPost.cmsPost.post.key = generateKeyFromPost(
        localChosenPost.cmsPost.post
      );
      break;
    case ACTION_TYPES.SELECT_POST:
      localChosenPost = {
        key: action.payload.key,
        cmsPost: JSON.parse(JSON.stringify(state.data[action.payload.key]))
      };
      break;
    case ACTION_TYPES.CLOSE_CURRENT_POST:
      localChosenPost = null;
      break;
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }

  return { chosenPost: localChosenPost };
}

// Actions whose primary need is to alter data
// Corresponds to actions needing db callout, requiring a sync with state data
// chosenPost may be altered as well
function dataReducer(state, action) {
  let localData = Object.assign({}, state.data);
  let chosenPost;

  function copyCurrentPostToData(currentPost) {
    let cmsPostDupe = JSON.parse(JSON.stringify(currentPost));
    localData[state.chosenPost.key] = cmsPostDupe;
  }

  function copyCurrentPost(post) {
    let shallowCopy = Object.assign({}, post);
    shallowCopy.cmsPost.lastModified = moment();
    return shallowCopy;
  }

  switch (action.type) {
    case ACTION_TYPES.CREATE_POST:
      localData[action.payload.id] = action.payload.cmsPost;
      chosenPost = {
        key: action.payload.id,
        cmsPost: JSON.parse(JSON.stringify(localData[action.payload.id]))
      };
      break;
    case ACTION_TYPES.DELETE_POST:
      delete localData[action.payload.id];
      chosenPost = null;
      break;
    case ACTION_TYPES.SAVE_CURRENT_POST:
      // TODO
      chosenPost = copyCurrentPost(state.chosenPost);
      copyCurrentPostToData(state.chosenPost.cmsPost);
      break;
    case ACTION_TYPES.UNPUBLISH_CURRENT_POST:
      chosenPost = copyCurrentPost(state.chosenPost);
      chosenPost.cmsPost.post.isPublished = false;
      copyCurrentPostToData(chosenPost.cmsPost);
      break;
    case ACTION_TYPES.PUBLISH_CURRENT_POST:
      chosenPost = copyCurrentPost(state.chosenPost);
      chosenPost.cmsPost.post.isPublished = true;
      copyCurrentPostToData(chosenPost.cmsPost);
      break;
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
  return {
    data: localData,
    chosenPost: chosenPost === undefined ? state.chosenPost : chosenPost
  };
}
