import React from "react";
import { useStateValue, exportStateData } from "./state";
import { PageHeaderControls } from "./components/page-header";
import { ACTION_TYPES } from "./reducers/index";
import DraggablePlugin from "./components/draggable-plugin";
import Accordion from "./components/accordion";
import BlockAttributes from "./components/block-attributes";
import PreviewButton from "./components/preview-button";

/**
 * Represents the editor's left hand command bar for modifying page and block metadata
 */
export default function Toolbar(props) {
  const [
    { plugins, blocks, onSave, focusedBlock, showPluginDescription, header },
    dispatch
  ] = useStateValue();

  /**
   * On button click,
   * executes the onSave cb with the page metadata and block information passed as args
   */
  function exportEditorData(e) {
    let { exportHeader, exportBlocks } = exportStateData(header, blocks);
    onSave(exportHeader, exportBlocks);
  }

  /**
   * On button click,
   * Remove focused block from global state
   */
  function deleteFocusedBlock(e) {
    dispatch({
      type: ACTION_TYPES.DELETE_FOCUSED_BLOCK
    });
  }

  /**
   * Render all plugins passed into the brandywine-editor instance as draggable onto the canvas
   */
  const PluginList = plugins.map(plugin => (
    <DraggablePlugin
      showPluginDescription={showPluginDescription}
      key={plugin.name}
      plugin={plugin}
    />
  ));

  return (
    <div>
      <section className="p-1">
        <Accordion title="Page Header">
          <PageHeaderControls />
        </Accordion>
        <Accordion title="Add Block">{PluginList}</Accordion>
        <Accordion title="Block Attributes" openOnDefault={true}>
          <BlockAttributes />
        </Accordion>
      </section>
      <section className="p-3">
        {onSave != null && (
          <button
            type="button"
            className="btn btn-block btn-success"
            onClick={exportEditorData}
          >
            Save
          </button>
        )}
        <PreviewButton />
        {focusedBlock != null && (
          <button
            type="button"
            className="btn btn-block btn-danger"
            onClick={deleteFocusedBlock}
          >
            Delete Current Block
          </button>
        )}
      </section>
    </div>
  );
}
