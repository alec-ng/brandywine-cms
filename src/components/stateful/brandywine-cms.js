import React from "react";
import styled from "styled-components";
import { connect } from 'react-redux';

import { updatePost } from '../../state/actions';

import Header from "../stateless/universal/header";
import Editor from '../stateless/global/brandywine-editor';
import SidebarDrawer from "../stateless/global/sidebar-drawer";
import ModalManager from './modal-manager';
import SnackbarManager from './snackbar-manager';
import PostManager from "./post-manager";
import ChosenPostManager from "./chosen-post-manager";

/**
 * Top level app composition container component
 */
function App({chosenPost, dispatch}) {

  function onEditorChange(header, blocks) {
    dispatch(updatePost({
      header: header,
      blocks: blocks
    }));
  }
  return (
    <>
      <ModalManager />
      <SnackbarManager />
      <Header>
        <SidebarDrawer>
          <PostManagerContainer chosenPost={chosenPost}>
            <PostManager />
          </PostManagerContainer>

          {chosenPost && (
            <ChosenPostManager />
          )}
        </SidebarDrawer>
      </Header>
      {chosenPost != null ? (
        <EditorContainer>
          <Editor
            postKey={chosenPost.key}
            postData={chosenPost.cmsPost.postData}
            onChange={onEditorChange}
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
const mapStateToProps = state => {
  return {
    chosenPost: state.chosenPost
  }
}; 
export default connect(mapStateToProps)(App);


const EditorContainer = styled.div`
  height: calc(100vh - 64px);
`;
const PostManagerContainer = styled.div`
  display: ${props => (props.chosenPost ? "none" : "inherit")};
`;
const EmptyEditorContainer = styled.div`
  display: flex;
  text-align: center;
  height: 80vh;
  justify-content: center;
  flex-direction: column;
`;
