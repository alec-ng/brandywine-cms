import React from "react";
import { BrandywineEditor } from "../scrapbook-editor/";
import { useStateValue } from "./state";
import { ACTION_TYPES } from "./reducers/index";
import styled from "styled-components";
import SidebarDrawer from "./components/sidebar-drawer";
import Toolbar from "./components/toolbar";
import Header from "./components/header";

export default function App(props) {
  const [{ chosenPost }, dispatch] = useStateValue();

  function onEditorChange(header, blocks) {
    // This works
    dispatch({
      type: ACTION_TYPES.UPDATE_CURRENT_POSTDATA,
      payload: {
        header: header,
        blocks: blocks
      }
    });
  }

  return (
    <>
      <Header>
        <SidebarDrawer>
          <Toolbar />
        </SidebarDrawer>
      </Header>
      {chosenPost != null ? (
        <EditorContainer>
          <BrandywineEditor
            showPluginDescription={props.showPluginDescription}
            plugins={props.plugins}
            key={chosenPost}
            onChange={onEditorChange}
            pageData={chosenPost.cmsPost.postData}
          />
        </EditorContainer>
      ) : (
        <EmptyEditorContainer>
          <h1 className="text-muted">
            In the toolbar, select or create a post to modify its contents here.
          </h1>
        </EmptyEditorContainer>
      )}
    </>
  );
}

const EditorContainer = styled.div`
  height: calc(100vh - 64px);
`;

const EmptyEditorContainer = styled.div`
  display: flex;
  text-align: center;
  height: 80vh;
  justify-content: center;
  flex-direction: column;
`;
