import React, { createContext, useReducer, useContext } from "react";

/**
 * Trims state data to be exported to parent component
 */
export const exportStateData = function(header, blocks) {
  let localHeader = JSON.parse(JSON.stringify(header));
  let localBlocks = JSON.parse(JSON.stringify(blocks).replace(/\n/g, "\\n"));

  // For each block, delete unneeded props and variation attributes not used
  localBlocks.forEach(block => {
    delete block.isFocused;
    delete block.uuid;
    Object.keys(block.variationAttrs).forEach(variationKey => {
      if (variationKey !== block.variation) {
        delete block.variationAttrs[variationKey];
      }
    });
  });

  return {
    exportHeader: localHeader,
    exportBlocks: localBlocks
  };
};

/**
 * Default editor state if none is provided
 * All expected keys are listed here
 */
export const DefaultState = {
  plugins: null,
  pluginMap: null,
  header: {
    title: "",
    subTitle: "",
    displayDate1: "",
    displayDate2: ""
  },
  blocks: [],
  focusedBlock: undefined,
  inPreviewMode: false,
  readOnly: false,
  verticalBlockMargin: "20px",
  showPluginDescription: true,
  onSave: null,
  onChange: null
};

/**
 * State management
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
