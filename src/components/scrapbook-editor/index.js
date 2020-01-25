import React from "react";
import { StateProvider, DefaultState } from "./state";
import { MainReducer } from "./reducers/index";
import uuidv1 from "uuid/v1";
import AppContainer from "./app";

export function BrandywineEditor(props) {
  if (!props.plugins || props.plugins.length < 1) {
    console.error("You must supply at least one plugin through props.plugins.");
  }
  if (!props.onSave && !props.onChange && !props.readOnly) {
    console.error(
      `If rendering in edit mode, you must supply at least one of onSave or onChange in order
       to access editor data.`
    );
  }

  // if pagedata provided, add it to state, and adjust blocks to provide a unique uuid
  let globalState = Object.assign({}, DefaultState);
  if (props.pageData) {
    let localPageData = JSON.parse(JSON.stringify(props.pageData));
    if (localPageData.blocks && localPageData.blocks.length > 0) {
      localPageData.blocks.forEach(block => {
        block.uuid = uuidv1();
        block.isFocused = false;
      });
    }
    globalState = Object.assign({}, globalState, localPageData);
  }

  globalState.plugins = props.plugins;
  if (typeof props.readOnly !== "undefined") {
    globalState.readOnly = props.readOnly;
  }

  // add a mapping of names => plugins to state
  let pluginMap = {};
  globalState.plugins.forEach(plugin => {
    pluginMap[plugin.name] = plugin;
  });
  globalState.pluginMap = pluginMap;

  // add other props to global state
  globalState.onChange = props.onChange;
  globalState.onSave = props.onSave;
  globalState.showPluginDescription =
    props.showPluginDescription === false ? false : true;

  return (
    <StateProvider initialState={globalState} reducer={MainReducer}>
      <AppContainer />
    </StateProvider>
  );
}
