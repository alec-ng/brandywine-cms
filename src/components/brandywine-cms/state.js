import React, { createContext, useReducer, useContext } from "react";

/**
 * Default editor state if none is provided
 */
export const DefaultState = {
  onAction: null, // fired whenever a C-UD action needs to be performed
  data: {}, // key value pairings, postId : cms-post
  chosenPost: null, // one specific key/value pair from data {key, post, postdata}
  postGroup: null // key of the grouping of posts loaded into the CMS
};

/**
 * State management for ScrapbookEditor
 */
export const StateContext = createContext();

/**
 * Returns a React component that wraps its children in a provider
 *
 * @param reducer main reducer object
 * @param initialState
 * @param children app content that should access the state
 */
export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

/**
 * Returns the state and reducer of the context, initially
 * provided by the arguments of StateProvider()
 */
export const useStateValue = () => useContext(StateContext);
