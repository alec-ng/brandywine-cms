import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import { MainReducer } from "./reducers";

export const DefaultState = {
  // dictionary of firebase id -> CMSPost instance
  data: {}, 
  // a CMSPost instance
  chosenPost: null, 
  // {type: key of modal to show, payload: object to be passed as props to the modal}
  showModal: null,
  // string with message to populate in snackbar
  snackbar: null,
  // object containing key value pairs of base action names => pending status
  pending: {},
};

export const store = createStore(
  MainReducer, 
  DefaultState,
  composeWithDevTools(
    applyMiddleware(
      thunk,
      promise
    )
  )
);
