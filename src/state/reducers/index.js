import { ActionType } from 'redux-promise-middleware';
import chosenPostReducer from './chosen-post-reducer';
import dataReducer from './data-reducer';
import {
  pendingReducer,
  snackbarReducer,
  modalReducer
} from './reducers';

export const MainReducer = (state = {}, action) => {
  return {
    data: dataReducer(state, action),
    chosenPost: chosenPostReducer(state, action),
    showModal: modalReducer(state.showModal, action),
    snackbar: snackbarReducer(state.snackbar, action),
    pending: pendingReducer(state.pending, action),
  }
}

/**
 * Util method to get the base name of an action type.
 * Synchronous actions should not have any underscores in its name
 *
 * Async actions could have one of either '_PENDING', '_FULFILLED', 
 * '_REJECTED' appended to the base action type name
 */
export function getActionName(actionType) {
  if (typeof actionType !== 'string') {
    return null;
  }
  if (actionType.endsWith(`_${ActionType.Pending}`) 
   || actionType.endsWith(`_${ActionType.Rejected}`)
   || actionType.endsWith(`_${ActionType.Fulfilled}`)) {
    return actionType.split("_").slice(0, -1).join("_");    
   } else {
    return actionType;
   }
 }

 /**
  * For reducers that will do something if the action type ends with fulfilled, 
  * trim off that part to return just the base name so it can match against the exported
  * action type name
  */
 export function trimFulfilledAction(actionType) {
    return actionType.endsWith(`_${ActionType.Fulfilled}`)
      ? getActionName(actionType)
      : actionType;
 }



