import React from "react";
import { StateProvider, DefaultState } from "./state";
import { MainReducer } from "./reducers/index";
import App from "./app";

export function ScrapbookCMS(props) {
  if (!props.onAction) {
    console.error("You must supply a promise for props.onAction.");
  }
  if (!props.plugins || props.plugins.length < 1) {
    console.error(
      "You must supply at least one plugin to use with Scrapbook-Editor."
    );
  }
  if (!props.postGroup) {
    console.error(
      "You must supply the name of the post grouping you're working with."
    );
  }

  const globalState = Object.assign({}, DefaultState);
  globalState.postGroup = props.postGroup;
  globalState.onAction = props.onAction;
  if (props.data) {
    globalState.data = props.data;
  }

  return (
    <StateProvider reducer={MainReducer} initialState={globalState}>
      <App
        showPluginDescription={props.showPluginDescription}
        plugins={props.plugins}
      />
    </StateProvider>
  );
}
