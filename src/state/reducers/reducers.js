import { getActionName, trimFulfilledAction } from './index';
import { SET_GROUPING } from '../actions/data-actions';
import {
  OPEN_MODAL,
  CLOSE_MODAL,
  SHOW_SNACKBAR,
  CLOSE_SNACKBAR
} from '../actions/';

/**
 * Misc small reducers go here
 */

export function pendingReducer(state = {}, action) {
  const { type } = action;
  const baseActionName = getActionName(action.type);
  if (!baseActionName) {
    return state;
  }
  if (type.endsWith("_PENDING")) {
    return {
      ...state,
      [baseActionName]: {
        pending: true
      }
    };
  }
  if (type.endsWith("_FULFILLED") || type.endsWith("_REJECTED")) {
    return {
      ...state,
      [baseActionName]: {
        pending: false
      }
    };
  }
  return state;
 }

export function snackbarReducer(state = null, action) {
  // In the case of an async action that failed, populate the snackbar with the failure message
  const { type } = action;
  if (type.endsWith("_REJECTED")) {
    return 'Sorry, something went wrong. Please try again.';
  }

  switch (action.type) {
    case SHOW_SNACKBAR:
      return action.message;
    case CLOSE_SNACKBAR:
      return null;
    default:
      return state;
  }
}

export function modalReducer(state = null, action) {
  switch (action.type)  {
    case OPEN_MODAL:
      return {
        type: action.modalType,
        payload: action.payload || {}
      }
    case CLOSE_MODAL:
      return null;
    default: 
      return state;
  }
}

export function postGroupReducer(state = null, action) {
  const baseActionName = trimFulfilledAction(action.type);

  switch (baseActionName) {
    case SET_GROUPING:
      return action.payload.grouping;      
    default: 
      return state;
  }
}