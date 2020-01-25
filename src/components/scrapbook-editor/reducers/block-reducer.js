import uuidv1 from "uuid/v1";
import { ACTION_TYPES } from "./index";

// Expected to return {blocks, focusedBlock}
export default function blockReducer(state, action) {
  let deepCloneBlocks = JSON.parse(JSON.stringify(state.blocks));
  switch (action.type) {
    case ACTION_TYPES.MOVE_BLOCK:
      return moveBlock(
        deepCloneBlocks,
        action.payload.targetBlockId,
        action.payload.positionBlockId
      );
    case ACTION_TYPES.ADD_BLOCK:
      return addNewBlock(
        deepCloneBlocks,
        state.pluginMap[action.payload.pluginName],
        action.payload.uuid
      );
    case ACTION_TYPES.SWITCH_BLOCK_FOCUS:
      return switchActiveBlock(deepCloneBlocks, action.payload.uuid);
    case ACTION_TYPES.UPDATE_FOCUSED_BLOCK:
      return updateFocusedBlock(
        deepCloneBlocks,
        state.focusedBlock.uuid,
        action.payload
      );
    case ACTION_TYPES.UPDATE_VARIATION:
      return updateVariation(
        deepCloneBlocks,
        state.focusedBlock.uuid,
        action.payload
      );
    case ACTION_TYPES.DELETE_FOCUSED_BLOCK:
      return deleteFocusedBlock(deepCloneBlocks, state.focusedBlock.uuid);
    default:
      throw new Error(`Unrecognized action type: ${action.type}`);
  }
}

///////////////////////////////////////////////////////////////////////////////////////

/**
 * Moves the targetBlock to the positionBlock's index
 */
function moveBlock(blockArr, targetBlockId, positionBlockId) {
  let targetBlockIndex = blockArr.findIndex(
    block => block.uuid === targetBlockId
  );
  let [blockToMove] = blockArr.splice(targetBlockIndex, 1);

  // Block is moved to the very end
  if (!positionBlockId) {
    blockArr.push(blockToMove);
  } else {
    // Block is moved to anywhere else
    let positionBlockIndex = blockArr.findIndex(
      block => block.uuid === positionBlockId
    );
    blockArr.splice(positionBlockIndex, 0, blockToMove);
  }

  // active block is block that was just moved
  return switchActiveBlock(blockArr, targetBlockId);
}

/**
 * Removes current focused blocks from global state
 */
function deleteFocusedBlock(blockArr, uuid) {
  let focusedInd = blockArr.findIndex(block => block.uuid === uuid);
  blockArr.splice(focusedInd, 1);
  return {
    focusedBlock: null,
    blocks: blockArr
  };
}

/**
 * Update the focused block's variation to the new value provided
 */
function updateVariation(blockArr, uuid, payload) {
  let focusedBlock = blockArr.find(block => block.uuid === uuid);
  if (focusedBlock.variation === payload.variation) {
    return;
  }
  focusedBlock.variation = payload.variation;
  if (!focusedBlock.variationAttrs[payload.variation]) {
    focusedBlock.variationAttrs[payload.variation] = {};
  }
  return {
    focusedBlock: focusedBlock,
    blocks: blockArr
  };
}

/**
 * Given a new value for an attribute, update the focused block and update its
 * copy in blockArr
 */
function updateFocusedBlock(blockArr, uuid, payload) {
  let focusedBlock = blockArr.find(block => block.uuid === uuid);
  if (payload.variation === "base") {
    focusedBlock.baseAttrs[payload.name] = payload.val;
  } else {
    focusedBlock.variationAttrs[payload.variation][payload.name] = payload.val;
  }
  return {
    focusedBlock: focusedBlock,
    blocks: blockArr
  };
}

/**
 * Sets all blocks as not focused except for the one specified by the uuid
 * and returns a reference to the focused block in blockArr
 */
function switchActiveBlock(blockArr, uuid) {
  blockArr.forEach(block => {
    block.isFocused = false;
  });

  let newActiveBlock = blockArr.find(block => block.uuid === uuid);
  newActiveBlock.isFocused = true;
  return {
    blocks: blockArr,
    focusedBlock: newActiveBlock
  };
}

/**
 * Given the name of the new block to add, creates a new block object to
 * add to blockArr at an index determined by uuid
 */
function addNewBlock(blockArr, plugin, uuid) {
  // Create new block with any default values
  let newBlock = {
    name: plugin.name,
    baseAttrs: {},
    variation: plugin.defaultVariation,
    variationAttrs: {},
    uuid: uuidv1(),
    isFocused: true
  };
  // populate any default attribute values
  if (plugin.baseAttrs) {
    plugin.baseAttrs.forEach(attr => {
      if (attr.defaultValue) {
        newBlock.baseAttrs[attr.name] = attr.defaultValue;
      }
    });
  }
  newBlock.variationAttrs[plugin.defaultVariation] = {};
  let defaultVariation = plugin.variations.find(
    variation => variation.name === plugin.defaultVariation
  );
  if (defaultVariation.attrs) {
    defaultVariation.attrs.forEach(attr => {
      if (attr.defaultValue) {
        newBlock.variationAttrs[plugin.defaultVariation][attr.name] =
          attr.defaultValue;
      }
    });
  }

  // Set all other blocks focus to false
  blockArr.forEach(block => {
    block.isFocused = false;
  });

  // add new block into array at correct position
  if (!uuid) {
    blockArr.push(newBlock);
  } else {
    let indexToAdd = blockArr.findIndex(block => block.uuid === uuid);
    blockArr.splice(indexToAdd, 0, newBlock);
  }

  return {
    focusedBlock: blockArr.find(block => block.uuid === newBlock.uuid),
    blocks: blockArr
  };
}
