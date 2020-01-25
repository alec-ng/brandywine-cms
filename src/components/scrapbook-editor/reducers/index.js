import blockReducer from "./block-reducer";
import { exportStateData } from "./../state";

export const ACTION_TYPES = {
  // Set header data
  UPDATE_HEADER: "UPDATE_HEADER",
  // updating focused block through toolbar
  UPDATE_FOCUSED_BLOCK: "UPDATE_FOCUSED_BLOCK",
  // on drop event- add new block to canvas
  ADD_BLOCK: "ADD_BLOCK",
  // on block click, switch focus to selected block
  SWITCH_BLOCK_FOCUS: "SWITCH_BLOCK_FOCUS",
  // focused block variation switch
  UPDATE_VARIATION: "UPDATE_VARIATION",
  // hides toolbar and shows preview button
  TOGGLE_PREVIEW_MODE: "TOGGLE_PREVIEW_MODE",
  // removes the focused block from the global state
  DELETE_FOCUSED_BLOCK: "DELETE_FOCUSED_BLOCK",
  // drag and drop block elements on the canvas
  MOVE_BLOCK: "MOVE_BLOCK"
};

export const MainReducer = function(state, action) {
  switch (action.type) {
    case ACTION_TYPES.TOGGLE_PREVIEW_MODE:
      return Object.assign({}, state, { inPreviewMode: !state.inPreviewMode });
    case ACTION_TYPES.UPDATE_HEADER:
      return updateHeaderWithChange(state, action);
    case ACTION_TYPES.SWITCH_BLOCK_FOCUS:
      return Object.assign(
        {},
        state,
        blockReducer(
          {
            blocks: state.blocks,
            pluginMap: state.pluginMap,
            focusedBlock: state.focusedBlock
          },
          action
        )
      );
    case ACTION_TYPES.ADD_BLOCK:
    case ACTION_TYPES.UPDATE_FOCUSED_BLOCK:
    case ACTION_TYPES.UPDATE_VARIATION:
    case ACTION_TYPES.DELETE_FOCUSED_BLOCK:
    case ACTION_TYPES.MOVE_BLOCK:
      return updateBlocksWithChange(state, action);
    default:
      throw new Error(`Unrecognized action type: ${action.type}`);
  }
};

/**
 * Updates the state's blocks and notifies parent of a change
 */
function updateBlocksWithChange(state, action) {
  let newState = Object.assign(
    {},
    state,
    blockReducer(
      {
        blocks: state.blocks,
        pluginMap: state.pluginMap,
        focusedBlock: state.focusedBlock
      },
      action
    )
  );
  dispatchChange(newState);
  return newState;
}

/**
 * Updates the state's header and notifies parent of a change
 */
function updateHeaderWithChange(state, action) {
  let newState = Object.assign({}, state, {
    header: Object.assign({}, state.header, {
      [action.payload.key]: action.payload.value
    })
  });
  dispatchChange(newState);
  return newState;
}

/**
 * If onChange was supplied as a prop, execute it with the new value of header and blocks
 */
function dispatchChange(state) {
  if (state.onChange) {
    let { exportHeader, exportBlocks } = exportStateData(
      state.header,
      state.blocks
    );
    state.onChange(exportHeader, exportBlocks);
  }
}
